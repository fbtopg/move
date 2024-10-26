import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabase.js';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { insertUserInfo } from '../../utils/supabaseUserUtils';
import { toast } from 'sonner';

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  return (
    <SupabaseAuthProviderInner>
      {children}
    </SupabaseAuthProviderInner>
  );
}

export const SupabaseAuthProviderInner = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
      if (session) {
        localStorage.setItem('user', JSON.stringify(session.user));
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      queryClient.invalidateQueries('user');
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        localStorage.setItem('user', JSON.stringify(session.user));
        try {
          await insertUserInfo(
            session.user.id,
            session.user.email,
            session.user.user_metadata.full_name || session.user.email.split('@')[0]
          );
        } catch (error) {
          console.error('Error storing user info:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('user');
      }
    });

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
      setLoading(false);
    };
  }, [queryClient]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      queryClient.invalidateQueries('user');
      setLoading(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        if (error.message === 'User rejected the request.') {
          toast.error('Sign in was cancelled');
        } else {
          console.error('Error logging in with Google:', error);
          toast.error('Failed to sign in with Google. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{ session, loading, logout, loginWithGoogle }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  return useContext(SupabaseAuthContext);
};

export const SupabaseAuthUI = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="default"
    providers={['google']}
  />
);
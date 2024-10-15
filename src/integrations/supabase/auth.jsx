import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabase.js';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { insertUserInfo } from '../../utils/supabaseUserUtils';

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
      if (event === 'SIGNED_IN') {
        localStorage.setItem('user', JSON.stringify(session.user));
        // Insert user info into the users table
        try {
          await insertUserInfo(
            session.user.id,
            session.user.user_metadata.full_name || session.user.email.split('@')[0],
            session.user.email
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
    await supabase.auth.signOut();
    setSession(null);
    queryClient.invalidateQueries('user');
    setLoading(false);
    // Remove user information from local storage on logout
    localStorage.removeItem('user');
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Error logging in with Google:', error);
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
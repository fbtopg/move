import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (data?.session) {
          navigate('/');
        } else {
          console.error('No session found after login');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error handling auth callback:', error.message);
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
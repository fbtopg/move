import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/supabase';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const Login = () => {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-4">
      <div></div>
      <div className="text-center">
        <img
          src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/applogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2FwcGxvZ28ucG5nIiwiaWF0IjoxNzI1Njk0NzAxLCJleHAiOjE3NTcyMzA3MDF9.s7cEAMNw4ZGNohLSIXJYCqqPmNSn6xyIYMmEVArTWVk&t=2024-09-07T07%3A38%3A21.315Z"
          alt="Move Logo"
          className="w-24 h-24 mx-auto mb-8"
        />
      </div>
      <Button
        onClick={handleGoogleLogin}
        className="w-full max-w-xs bg-white text-black hover:bg-gray-200 flex items-center justify-center space-x-2 py-6"
      >
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="Google Logo"
          className="w-6 h-6 object-contain"
        />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};

export default Login;
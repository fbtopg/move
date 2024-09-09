import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase/auth';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSkipLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome to Move
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your account or continue as a guest
          </p>
        </div>
        <SupabaseAuthUI />
        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-sm text-gray-400 hover:text-white"
            onClick={handleSkipLogin}
          >
            I don't have an account (Continue as guest)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
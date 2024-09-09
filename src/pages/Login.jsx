import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '../integrations/supabase';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Welcome to Move</h1>
      <Button 
        className="w-64 bg-white text-black hover:bg-gray-200 transition-colors mb-4 h-12"
        onClick={handleLogin}
      >
        Log In
      </Button>
    </div>
  );
};

export default Login;
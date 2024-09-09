import React, { useEffect } from 'react';
import { SupabaseAuthUI } from '../integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const Login = () => {
  const navigate = useNavigate();
  const { session, loading } = useSupabaseAuth();

  useEffect(() => {
    console.log("Login page - Session:", session);
    console.log("Login page - Loading:", loading);
    if (session) {
      console.log("Redirecting to home page");
      navigate('/');
    }
  }, [session, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login to Move</h1>
        <SupabaseAuthUI />
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const Login = () => {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  React.useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

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
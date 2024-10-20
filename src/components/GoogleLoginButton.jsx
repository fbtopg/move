import React from 'react';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '../integrations/supabase/auth';

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useSupabaseAuth();

  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors duration-300 flex items-center justify-center space-x-2"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
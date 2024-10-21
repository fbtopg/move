import React from 'react';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '../integrations/supabase/auth';

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useSupabaseAuth();

  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
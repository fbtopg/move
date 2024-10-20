import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SupabaseAuthUI } from '../integrations/supabase/auth';
import GoogleLoginButton from './GoogleLoginButton';

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <GoogleLoginButton />
          <div className="mt-4">
            <SupabaseAuthUI />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
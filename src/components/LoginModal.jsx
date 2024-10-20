import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SupabaseAuthUI } from '../integrations/supabase/auth';
import GoogleLoginButton from './GoogleLoginButton';
import { motion } from 'framer-motion';

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 relative"
          style={{
            backgroundImage: `url('https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/login%20modal%20background.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL2xvZ2luIG1vZGFsIGJhY2tncm91bmQucG5nIiwiaWF0IjoxNzI5NDMwNjI2LCJleHAiOjE3NjA5NjY2MjZ9.Z2myj_EomW0gNAM4qoAn_CGmt_ALKkXAz2gnjqnH_Ag&t=2024-10-20T13%3A23%3A46.095Z')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Sign in to your account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <GoogleLoginButton />
              <div className="mt-4">
                <SupabaseAuthUI />
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GoogleLoginButton from './GoogleLoginButton';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white dark:bg-gray-800"
        />
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="relative bg-white dark:bg-gray-800 h-full flex flex-col p-6 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/login%20modal%20background2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2xvZ2luIG1vZGFsIGJhY2tncm91bmQyLnBuZyIsImlhdCI6MTcyOTQ4NDIwNSwiZXhwIjoxNzYxMDIwMjA1fQ.Eu76CGlTM-60c7KxGaJyDk4XMJ4VJ5tumRJjo7vO1AE&t=2024-10-21T04%3A16%3A45.074Z')`
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center justify-end flex-grow">
            <h1 className="text-2xl font-medium text-center mb-4">
              Create groups, connect & share with friends.
            </h1>
            <GoogleLoginButton />
            <p className="text-[10px] text-gray-500 mt-2 text-center font-light">
              By continuing, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
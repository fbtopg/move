import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GoogleLoginButton from './GoogleLoginButton';
import { motion } from 'framer-motion';

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-none p-0 m-0 border-t-0">
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="bg-white dark:bg-gray-800 h-full w-full flex flex-col p-6"
        >
          <div className="flex flex-col items-center justify-end flex-grow mb-8">
            <img
              src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Group%20289236.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0dyb3VwIDI4OTIzNi5wbmciLCJpYXQiOjE3Mjk0ODY5NDMsImV4cCI6MTc2MTAyMjk0M30.6YiAn9sddOsNJ9cD1b7YZGl-JfEEAgvC4J1weJHtq_Y&t=2024-10-21T05%3A02%3A22.347Z"
              alt="Login illustration"
              className="w-64 h-64 object-contain mx-auto mb-6"
            />
            <h1 className="text-2xl font-medium text-center mb-4">
              Create groups, connect & share with friends.
            </h1>
            <div className="mb-4 w-full">
              <GoogleLoginButton />
            </div>
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
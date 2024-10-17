import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import GoogleLoginButton from './GoogleLoginButton';

const LoginPopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }} // Changed from spring to tween
        className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg z-50 h-3/4"
      >
        <div className="p-6 h-full flex flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-bold mb-6">Login Required</h2>
          <p className="mb-6">Please log in to access this feature.</p>
          <div className="flex-grow flex items-start justify-start">
            <GoogleLoginButton />
          </div>
          <p className="text-sm text-gray-500 mt-auto text-center">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </p>
          <p className="text-xs text-gray-400 mt-2 text-center">
            © {new Date().getFullYear()} Topundred Inc. All rights reserved.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default LoginPopup;
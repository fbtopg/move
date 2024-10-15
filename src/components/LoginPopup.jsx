import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import GoogleLoginButton from './GoogleLoginButton';

const LoginPopup = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 500 }}
      className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg z-50"
    >
      <div className="p-6">
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
        <GoogleLoginButton />
      </div>
    </motion.div>
  );
};

export default LoginPopup;
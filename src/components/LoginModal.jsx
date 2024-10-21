import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GoogleLoginButton from './GoogleLoginButton';
import { motion } from 'framer-motion';

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
          className="relative bg-white dark:bg-gray-800 h-full flex flex-col justify-center p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Sign in to your account</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <GoogleLoginButton />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
          className="relative bg-white dark:bg-gray-800 h-full flex flex-col p-6"
        >
          <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-3xl font-medium text-center mb-8">
              Create groups, connect & share with friends.
            </h1>
            <GoogleLoginButton />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
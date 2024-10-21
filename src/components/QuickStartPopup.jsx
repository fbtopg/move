import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuickStartPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg p-6"
            style={{ maxHeight: '80vh' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">QuickStart</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="overflow-y-auto">
              {/* Add your QuickStart content here */}
              <p>Welcome to QuickStart! This is where you can add your quick start content.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickStartPopup;
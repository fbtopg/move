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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg p-6 flex flex-col"
            style={{ height: '40vh' }} // Changed from 50vh to 40vh
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Choose activity</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <Button 
                onClick={onClose} 
                className="bg-primary text-white rounded-full w-32 h-32 text-xl font-bold flex items-center justify-center"
              >
                Walk
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickStartPopup;
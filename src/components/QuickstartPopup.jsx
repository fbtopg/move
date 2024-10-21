import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickstartPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg"
        >
          <div className="w-full h-[50vh] max-w-none p-0 m-0 border-t-0 flex flex-col">
            <div className="flex flex-row items-center justify-between p-4 border-b w-full">
              <h2 className="text-xl font-bold w-full text-center">Choose activity</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 flex-grow flex flex-col justify-end p-6 w-full">
              <div className="flex flex-col items-center justify-end mb-8 w-full">
                <Button 
                  onClick={() => console.log('Start button clicked')} 
                  className="w-full flex items-center justify-center mb-4"
                >
                  <Play className="mr-2 h-5 w-5" />
                  START
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickstartPopup;
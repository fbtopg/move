import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Footprints } from 'lucide-react';

const QuickstartModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg z-50"
          style={{ maxHeight: '30vh' }}
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4">Choose activity</h2>
            <Button 
              onClick={() => console.log('Walk button clicked')} 
              className="w-full flex items-center justify-center"
            >
              <Footprints className="mr-2 h-5 w-5" />
              Walk
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickstartModal;
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Footprints } from 'lucide-react';

const QuickstartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg p-6"
        style={{ height: '30vh', maxHeight: '250px' }}
      >
        <h2 className="text-2xl font-bold mb-4">Choose activity</h2>
        <Button 
          onClick={() => console.log('Walk button clicked')} 
          className="w-full flex items-center justify-center"
        >
          <Footprints className="mr-2 h-5 w-5" />
          Walk
        </Button>
      </motion.div>
    </>
  );
};

export default QuickstartModal;
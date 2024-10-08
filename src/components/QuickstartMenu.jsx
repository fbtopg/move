import React, { useEffect, useState } from 'react';
import { Plus, Footprints, Trophy, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import CreateGroupModal from './CreateGroupModal';

const QuickstartMenu = ({ onClose }) => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const options = [
    { 
      label: 'Create Group', 
      icon: Plus, 
      action: () => setShowCreateGroupModal(true)
    },
    { label: 'Walk', icon: Footprints, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
    { label: 'Close', icon: X, action: onClose },
  ];

  useEffect(() => {
    document.body.style.setProperty('--status-bar-color', '#FEF8F3');
    document.body.classList.add('dimmed-status-bar');
    return () => {
      document.body.style.removeProperty('--status-bar-color');
      document.body.classList.remove('dimmed-status-bar');
    };
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 },
    }),
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      />
      
      <motion.div
        className="fixed inset-x-0 bottom-20 flex flex-col items-center z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={menuVariants}
      >
        <motion.div className="flex space-x-6 mb-4">
          {options.map((option, index) => (
            <motion.div
              key={index}
              variants={buttonVariants}
              custom={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                onClick={option.action}
              >
                <option.icon className="h-8 w-8" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
      />
    </>
  );
};

export default QuickstartMenu;
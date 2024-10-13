import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import CreateGroupForm from './CreateGroupForm';
import { insertNewGroup } from '../utils/supabaseGroupUtils';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

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

  const handleCreateGroup = async (groupName) => {
    try {
      const newGroup = await insertNewGroup(groupName);
      onClose();
      navigate(`/group/${newGroup.id}`, { 
        state: { 
          group: newGroup,
          animateEntry: true
        } 
      });
      return newGroup;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    },
    exit: { 
      y: "100%", 
      opacity: 0,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-3xl z-50 overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            <div className="relative h-full p-6 flex flex-col">
              <button
                onClick={onClose}
                className="absolute top-6 left-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-center mb-6">Create a new group</h2>
              <CreateGroupForm handleCreateGroup={handleCreateGroup} onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
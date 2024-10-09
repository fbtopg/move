import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCreateGroup = (groupData) => {
    const newGroupId = Date.now().toString();
    navigate(`/group/${newGroupId}`, { 
      state: { 
        groupName: groupData.name,
        animateEntry: true
      } 
    });
    onClose();
  };

  const modalVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: { 
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 bg-background z-50 overflow-hidden"
        >
          <div className="h-full p-6 pb-20 flex flex-col">
            <CreateGroupForm handleCreateGroup={handleCreateGroup} onClose={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
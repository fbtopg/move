import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('status-bar-hidden');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.classList.remove('status-bar-hidden');
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.body.classList.remove('status-bar-hidden');
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled on unmount
    };
  }, [isOpen]);

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
            className="fixed inset-0 bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] z-50 overflow-hidden"
          >
            <div className="relative h-full p-6 flex flex-col">
              <CreateGroupForm handleCreateGroup={handleCreateGroup} onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
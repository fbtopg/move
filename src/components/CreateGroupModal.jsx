import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreateGroupForm from './CreateGroupForm';
import { insertNewGroup } from '../utils/supabaseGroupUtils';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import LoginPopup from './LoginPopup';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const { session } = useSupabaseAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const adjustModalPosition = useCallback(() => {
    if (modalRef.current) {
      const viewportHeight = window.innerHeight;
      const keyboardHeight = viewportHeight - window.visualViewport.height;
      modalRef.current.style.bottom = `${keyboardHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      window.visualViewport.addEventListener('resize', adjustModalPosition);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.visualViewport.removeEventListener('resize', adjustModalPosition);
    };
  }, [isOpen, adjustModalPosition]);

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

  useEffect(() => {
    if (isOpen && !session) {
      setShowLoginPopup(true);
    }
  }, [isOpen, session]);

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
            ref={modalRef}
            key="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-3xl z-50 overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            <div className="relative h-full p-6 flex flex-col">
              <div className="flex items-center mb-2">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-semibold flex-grow text-center mr-6">Create a new group</h2>
              </div>
              <CreateGroupForm handleCreateGroup={handleCreateGroup} onClose={onClose} />
            </div>
          </motion.div>
          <LoginPopup isOpen={showLoginPopup} onClose={() => {
            setShowLoginPopup(false);
            onClose();
          }} />
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;

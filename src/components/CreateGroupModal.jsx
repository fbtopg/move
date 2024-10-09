import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
            <CreateGroupForm handleCreateGroup={handleCreateGroup} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
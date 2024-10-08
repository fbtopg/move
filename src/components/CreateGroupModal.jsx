import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CreateGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCreateGroup = (groupData) => {
    const newGroupId = Date.now().toString();
    navigate(`/group/${newGroupId}`, { 
      state: { 
        groupImage: groupData.image,
        groupName: groupData.name,
        groupDescription: groupData.description,
        isPrivate: groupData.isPrivate,
        capacity: groupData.capacity === 'unlimited' ? 'Unlimited' : parseInt(groupData.capacity),
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
          className="fixed inset-0 bg-background z-50 overflow-y-auto"
        >
          <div className="min-h-screen p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={onClose} className="p-0">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h2 className="text-2xl font-bold text-center flex-grow">Create Group</h2>
              <div className="w-6"></div> {/* Spacer for centering */}
            </div>

            <CreateGroupForm handleCreateGroup={handleCreateGroup} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CreateGroupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('status-bar-hidden');
    } else {
      document.body.classList.remove('status-bar-hidden');
    }

    return () => {
      document.body.classList.remove('status-bar-hidden');
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
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover scale-150 transform-gpu"
            >
              <source src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/178531-859955978_tiny.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjLzE3ODUzMS04NTk5NTU5NzhfdGlueS5tcDQiLCJpYXQiOjE3Mjg0NDYyNzYsImV4cCI6MTc1OTk4MjI3Nn0.DjT3eU1J4DHMTTO_fxXerRD1aQyV3aOgLC2npH2fTfo&t=2024-10-09T03%3A57%3A55.575Z" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="relative h-full p-6 pb-20 flex flex-col">
            <CreateGroupForm handleCreateGroup={handleCreateGroup} onClose={onClose} />
            <Button
              onClick={onClose}
              className="mt-4 bg-white text-black hover:bg-gray-100"
              variant="outline"
            >
              <X className="mr-2 h-4 w-4" /> Close
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
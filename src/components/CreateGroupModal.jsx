import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { initialGroupData, validateForm } from '../utils/createGroupUtils.jsx';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';
import { getRandomGradient } from '../utils/gradientUtils';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState(initialGroupData);
  const [errors, setErrors] = useState({});
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setBackgroundGradient(getRandomGradient());
    }
  }, [isOpen]);

  const handleCreateGroup = () => {
    const newErrors = validateForm(groupData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const newGroupId = Date.now().toString();
      navigate(`/group/${newGroupId}`, { 
        state: { 
          groupImage: groupData.image,
          groupName: groupData.name,
          groupDescription: groupData.description,
          isPrivate: groupData.isPrivate,
          animateEntry: true
        } 
      });
      onClose();
    }
  };

  const handleClose = () => {
    if (groupData.name || groupData.image || groupData.description) {
      setShowCloseConfirmation(true);
    } else {
      onClose();
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

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className={`fixed inset-0 text-white z-50 overflow-y-auto ${backgroundGradient}`}
          >
            <div className="min-h-screen p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-white/20 rounded-full">
                  <X className="h-6 w-6" />
                </Button>
                <h2 className="text-xl font-light text-center flex-grow">Create Group</h2>
                <div className="w-10"></div>
              </div>

              <CreateGroupForm
                groupData={groupData}
                setGroupData={setGroupData}
                errors={errors}
                setErrors={setErrors}
                handleCreateGroup={handleCreateGroup}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={showCloseConfirmation} onOpenChange={setShowCloseConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to close?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Closing will discard these changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateGroupModal;
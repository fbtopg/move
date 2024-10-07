import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { initialGroupData, validateForm } from '../utils/createGroupUtils.jsx';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState(initialGroupData);
  const [errors, setErrors] = useState({});
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const navigate = useNavigate();

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
            className="fixed inset-0 bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground z-50 overflow-y-auto"
          >
            <div className="min-h-screen p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-foreground">Create Group</h2>
                <Button variant="ghost" size="icon" onClick={handleClose} className="text-foreground hover:bg-gray-200 rounded-full">
                  <X className="h-6 w-6" />
                </Button>
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
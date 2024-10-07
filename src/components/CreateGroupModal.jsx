import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { initialGroupData, validateForm } from '../utils/createGroupUtils.jsx';
import { handleImageUpload } from '../utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState(initialGroupData);
  const [errors, setErrors] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
      document.head.appendChild(metaTag);
      return () => document.head.removeChild(metaTag);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGroupData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setGroupData(prev => ({ ...prev, image: imageUrl }));
        if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-background text-foreground z-50 rounded-t-3xl shadow-lg"
          >
            <div className="p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create Group</h2>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <CreateGroupForm
                groupData={groupData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                onCropComplete={onCropComplete}
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
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Lock, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { handleImageUpload } from '../utils/imageUtils';
import Cropper from 'react-easy-crop';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { initialGroupData, validateForm } from '../utils/createGroupUtils.jsx';
import { useNavigate } from 'react-router-dom';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState(initialGroupData);
  const [errors, setErrors] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Add meta tag to prevent zooming
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
      document.head.appendChild(metaTag);

      // Remove meta tag when component unmounts or closes
      return () => {
        document.head.removeChild(metaTag);
      };
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGroupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
      console.log('Creating group:', groupData, 'Cropped area:', croppedAreaPixels);
      // Simulate group creation and getting an ID
      const newGroupId = Date.now().toString();
      setIsConfirmationStep(true);
      // Navigate to the new group page
      navigate(`/group/${newGroupId}`);
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

  const renderCreateGroupForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }}>
      <Input
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleInputChange}
        className={`mb-1 ${errors.name ? 'border-red-500' : ''}`}
      />
      {errors.name && <p className="text-red-500 text-xs mb-4">{errors.name}</p>}

      <div className="relative mb-1 h-60">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="groupImageUpload"
        />
        {groupData.image ? (
          <Cropper
            image={groupData.image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <label
            htmlFor="groupImageUpload"
            className={`flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors ${errors.image ? 'border-red-500' : 'border-input'}`}
          >
            <div className="text-center">
              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Upload Group Image</p>
            </div>
          </label>
        )}
      </div>
      {errors.image && <p className="text-red-500 text-xs mb-4">{errors.image}</p>}

      <Textarea
        name="description"
        placeholder="Group Description"
        value={groupData.description}
        onChange={handleInputChange}
        rows={4}
        className="mb-4"
      />

      <div className="flex items-center space-x-2 mb-6">
        <Switch
          id="private-mode"
          name="isPrivate"
          checked={groupData.isPrivate}
          onCheckedChange={(checked) => setGroupData(prev => ({ ...prev, isPrivate: checked }))}
        />
        <label htmlFor="private-mode" className="text-sm font-medium leading-none">
          <Lock className="inline-block mr-2 h-4 w-4" />
          Private Group
        </label>
      </div>

      <Button type="submit" className="w-full">
        Create Group <Sparkles className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );

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

              {renderCreateGroupForm()}
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

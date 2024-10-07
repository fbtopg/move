import React, { useState, useCallback } from 'react';
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
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const navigate = useNavigate();

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#FEF8F3] text-foreground z-50 overflow-y-auto"
          >
            <div className="min-h-screen p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Group</h2>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-6 w-6 text-gray-600" />
                </Button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }} className="space-y-6">
                <Input
                  name="name"
                  placeholder="Group Name"
                  value={groupData.name}
                  onChange={handleInputChange}
                  className={`mb-1 bg-white border-gray-300 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

                <div className="relative h-60 bg-white rounded-lg border border-gray-300">
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
                      className="flex items-center justify-center w-full h-full cursor-pointer"
                    >
                      <div className="text-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload Group Image</p>
                      </div>
                    </label>
                  )}
                </div>
                {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}

                <Textarea
                  name="description"
                  placeholder="Group Description"
                  value={groupData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-white border-gray-300"
                />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="private-mode"
                    name="isPrivate"
                    checked={groupData.isPrivate}
                    onCheckedChange={(checked) => setGroupData(prev => ({ ...prev, isPrivate: checked }))}
                  />
                  <label htmlFor="private-mode" className="text-sm font-medium text-gray-700 flex items-center">
                    <Lock className="inline-block mr-2 h-4 w-4" />
                    Private Group
                  </label>
                </div>

                <Button type="submit" className="w-full bg-[#3B72EC] hover:bg-[#3B72EC]/90 text-white">
                  Create Group <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </form>
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
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Lock, Sparkles, Share } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { handleImageUpload } from '../utils/imageUtils';
import Cropper from 'react-easy-crop';
import { shareInvite } from '../utils/shareUtils';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    image: null,
    description: '',
    isPrivate: false
  });
  const [errors, setErrors] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGroupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setGroupData(prev => ({ ...prev, image: imageUrl }));
        // Clear error when image is uploaded
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: '' }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!groupData.name.trim()) {
      newErrors.name = 'Group name is required';
    }
    if (!groupData.image) {
      newErrors.image = 'Group image is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateGroup = () => {
    if (validateForm()) {
      console.log('Creating group:', groupData, 'Cropped area:', croppedAreaPixels);
      setIsConfirmationStep(true);
    }
  };

  const handleConfirmation = () => {
    console.log('Group creation confirmed');
    onClose();
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

      <Button 
        type="submit"
        className="w-full"
      >
        Create Group <Sparkles className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );

  const renderConfirmationStep = () => (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Group Created Successfully!</h3>
      <div className="mb-4">
        {groupData.image && (
          <img src={groupData.image} alt="Group" className="w-32 h-32 rounded-full mx-auto mb-2" />
        )}
        <p className="font-medium">{groupData.name}</p>
      </div>
      <Button 
        onClick={shareInvite}
        className="w-full mb-4"
      >
        Share Invite Link <Share className="ml-2 h-4 w-4" />
      </Button>
      <Button 
        onClick={handleConfirmation}
        className="w-full"
      >
        Done
      </Button>
    </div>
  );

  return (
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
              <h2 className="text-2xl font-bold">
                {isConfirmationStep ? 'Group Created' : 'Create Group'}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {isConfirmationStep ? renderConfirmationStep() : renderCreateGroupForm()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Lock, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { handleImageUpload } from '../utils/imageUtils';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    image: null,
    description: '',
    isPrivate: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGroupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setGroupData(prev => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleCreateGroup = () => {
    console.log('Creating group:', groupData);
    onClose();
  };

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
              <h2 className="text-2xl font-bold">Create Group</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }}>
              <Input
                name="name"
                placeholder="Group Name"
                value={groupData.name}
                onChange={handleInputChange}
                className="mb-4"
              />

              <div className="relative mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="groupImageUpload"
                />
                <label
                  htmlFor="groupImageUpload"
                  className="flex items-center justify-center w-full h-40 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors overflow-hidden"
                >
                  {groupData.image ? (
                    <img src={groupData.image} alt="Group" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Group Image</p>
                    </div>
                  )}
                </label>
              </div>

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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
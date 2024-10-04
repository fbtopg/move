import React, { useState } from 'react';
import { motion } from "framer-motion";
import { X, Upload, UserPlus, Link } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload } from '../utils/imageUtils';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setGroupImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleCreateGroup = () => {
    // Implement group creation logic here
    console.log('Creating group:', { groupName, groupImage, groupDescription });
    onClose();
  };

  const handleInviteLink = () => {
    // Implement invite link generation logic here
    console.log('Generate and share invite link');
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-background text-foreground z-50 overflow-y-auto"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Group</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4 flex-grow">
          <Input
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="groupImageUpload"
            />
            <label
              htmlFor="groupImageUpload"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            >
              {groupImage ? (
                <img src={groupImage} alt="Group" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">Upload Group Image</p>
                </div>
              )}
            </label>
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => console.log('Add members')}>
              <UserPlus className="mr-2 h-4 w-4" /> Add Members
            </Button>
            <Button className="flex-1" variant="outline" onClick={handleInviteLink}>
              <Link className="mr-2 h-4 w-4" /> Invite Link
            </Button>
          </div>
          <Textarea
            placeholder="Group Description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            rows={4}
          />
        </div>
        <Button className="mt-4" onClick={handleCreateGroup}>Create Group</Button>
      </div>
    </motion.div>
  );
};

export default CreateGroupModal;
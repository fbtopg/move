import React, { useState } from 'react';
import { motion } from "framer-motion";
import { X, Upload, UserPlus, Link, Lock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { handleImageUpload } from '../utils/imageUtils';

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

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
    console.log('Creating group:', { groupName, groupImage, groupDescription, isPrivate, members });
    onClose();
  };

  const handleInviteLink = () => {
    console.log('Generate and share invite link');
  };

  const handleAddMember = () => {
    if (newMember.trim() !== '') {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
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
        <div className="space-y-4 flex-grow overflow-y-auto">
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
            <Input
              placeholder="Add member"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddMember}>
              <UserPlus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          {members.length > 0 && (
            <div className="mt-2 space-y-2">
              <h3 className="font-semibold">Added Members:</h3>
              {members.map((member, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{member}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button className="w-full" variant="outline" onClick={handleInviteLink}>
            <Link className="mr-2 h-4 w-4" /> Generate Invite Link
          </Button>
          <Textarea
            placeholder="Group Description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            rows={4}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="private-mode"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
            <label htmlFor="private-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              <Lock className="inline-block mr-2 h-4 w-4" />
              Private Group
            </label>
          </div>
        </div>
        <Button className="mt-4" onClick={handleCreateGroup}>Create Group</Button>
      </div>
    </motion.div>
  );
};

export default CreateGroupModal;
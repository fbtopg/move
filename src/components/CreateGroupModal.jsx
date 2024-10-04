import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link, Lock, Camera, Sparkles } from 'lucide-react';
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
  const [step, setStep] = useState(1);

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
    console.log('Creating group:', { groupName, groupImage, groupDescription, isPrivate });
    onClose();
  };

  const handleInviteLink = () => {
    console.log('Generate and share invite link');
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 0.2 } }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-background/80 backdrop-blur-sm text-foreground z-50 overflow-y-auto"
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div 
              className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
              layoutId="modal-container"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <motion.h2 
                    className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    layoutId="modal-title"
                  >
                    Create Group
                  </motion.h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Input
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
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
                          className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors overflow-hidden group"
                        >
                          {groupImage ? (
                            <img src={groupImage} alt="Group" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                          ) : (
                            <div className="text-center">
                              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">Upload Group Image</p>
                            </div>
                          )}
                        </label>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => setStep(2)}
                      >
                        Next <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Textarea
                        placeholder="Group Description"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        rows={4}
                        className="mb-4"
                      />
                      <div className="flex items-center space-x-2 mb-4">
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
                      <Button 
                        className="w-full mb-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={handleCreateGroup}
                      >
                        Create Group <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        onClick={handleInviteLink}
                      >
                        <Link className="mr-2 h-4 w-4" /> Generate Invite Link
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
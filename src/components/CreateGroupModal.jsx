import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link, Lock, Camera, Sparkles, Check } from 'lucide-react';
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
    setStep(3); // Move to the confirmation page
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

  const ConfirmationPage = () => (
    <motion.div
      key="confirmation"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto">
          <Check className="text-primary-foreground w-12 h-12" />
        </div>
      </motion.div>
      <h3 className="text-2xl font-bold mb-4">Group Created!</h3>
      <p className="text-muted-foreground mb-6">Your group "{groupName}" has been successfully created.</p>
      <Button 
        className="w-full"
        onClick={onClose}
      >
        Done
      </Button>
    </motion.div>
  );

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
              className="w-full max-w-md bg-card rounded-2xl shadow-xl overflow-hidden"
              layoutId="modal-container"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <motion.h2 
                    className="text-3xl font-bold text-foreground"
                    layoutId="modal-title"
                  >
                    {step === 3 ? "Congratulations!" : "Create Group"}
                  </motion.h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <>
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
                          className="flex items-center justify-center w-full h-40 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors overflow-hidden group"
                        >
                          {groupImage ? (
                            <img src={groupImage} alt="Group" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                          ) : (
                            <div className="text-center">
                              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Upload Group Image</p>
                            </div>
                          )}
                        </label>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => setStep(2)}
                      >
                        Next <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {step === 2 && (
                    <>
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
                        className="w-full mb-2"
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
                    </>
                  )}
                  {step === 3 && <ConfirmationPage />}
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
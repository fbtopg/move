import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share, X } from "lucide-react";
import { toast } from "sonner";

const InviteFriends = ({ isOpen, onClose, inviteLink }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join my group",
          text: "I'd like to invite you to join my group!",
          url: inviteLink
        });
        toast.success("Shared successfully!");
        onClose();
      } else {
        await navigator.clipboard.writeText(inviteLink);
        toast.success("Invite link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share invite link");
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-black text-white z-50"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invite Friends</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <Button 
            className="w-full max-w-sm bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors h-16 rounded-full flex items-center justify-center"
            onClick={handleShare}
          >
            <Share className="mr-2 h-5 w-5" /> Share Invite Link
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default InviteFriends;
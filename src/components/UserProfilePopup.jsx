import React from 'react';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const UserProfilePopup = ({ isOpen, onClose, user }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-black text-white z-50 overflow-y-auto"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-end mb-6">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light">{user.username}</h1>
          <Avatar className="w-20 h-20 rounded-full">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex mb-12">
          <div className="mr-24">
            <p className="text-sm text-gray-400 uppercase mb-1">Followers</p>
            <p className="text-sm">{user.followers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 uppercase mb-1">Following</p>
            <p className="text-sm">{user.following}</p>
          </div>
        </div>
        
        {/* Add more user profile content here */}
      </div>
    </motion.div>
  );
};

export default UserProfilePopup;
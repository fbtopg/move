import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const UserProfilePopup = ({ isOpen, onClose, user }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose();
    }
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      className={`fixed inset-0 bg-black text-white z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ touchAction: 'none' }}
    >
      <div className="h-full overflow-y-auto" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
        <div className="p-4 flex flex-col h-full w-full max-w-md mx-auto">
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-8" />
          
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
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white hover:bg-white hover:text-black transition-colors mb-8"
          >
            <Plus className="h-4 w-4 mr-2" /> Follow
          </Button>
          
          {/* Add more profile content here */}
          <p className="text-gray-400">User bio and additional information can be added here.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePopup;
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
        <div className="p-4 flex flex-col h-full max-w-md mx-auto">
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-8" />
          
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-20 h-20 mb-4">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-light mb-2">{user.username}</h1>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-white hover:text-black transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" /> Follow
            </Button>
          </div>
          
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.followers}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.following}</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
          
          <div className="flex-grow">
            {/* Add more user profile content here */}
            <p className="text-gray-400">User bio and additional information can be added here.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePopup;
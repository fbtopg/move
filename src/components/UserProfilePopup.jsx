import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const UserProfilePopup = ({ isOpen, onClose, user }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose();
    }
    setIsDragging(false);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
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
      style={{ touchAction: 'none', height: '90vh', top: 'auto', width: '100%', left: 0, right: 0 }}
    >
      <div className="h-full overflow-y-auto" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
        <div className="p-4 flex flex-col h-full w-full">
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-8" />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-light">{user.username}</h1>
              <p className="text-sm text-gray-400 mb-4">{user.handle}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className={`text-white bg-gray-700 hover:bg-gray-600 transition-colors h-8 ${isFollowing ? 'bg-gray-600' : ''}`}
                onClick={toggleFollow}
              >
                {isFollowing ? 'Following' : <><Plus className="h-4 w-4 mr-1" /> Follow</>}
              </Button>
            </div>
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
          
          <div className="flex mb-8">
            <div className="flex flex-col items-start">
              <div 
                className="w-24 h-24 rounded-lg flex items-center justify-center cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at center, #222222, #111111)',
                }}
                onClick={() => navigate('/achievements')}
              >
                <Trophy className="w-10 h-10 stroke-[0.5]" />
              </div>
              <span className="text-xs mt-2">Achievements</span>
            </div>
          </div>
          
          <p className="text-gray-400">User bio and additional information can be added here.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePopup;
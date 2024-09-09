import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Plus, ArrowRight } from "lucide-react";
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

  const activeChallenges = [
    { name: "Daily Walk", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailywalkimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHl3YWxraW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU3NjM1MTgsImV4cCI6MTc1NzI5OTUxOH0.GLkQ1VOFZKx98eUHrlNTYxPi7lBaji1GVRee_iUDljs&t=2024-09-08T02%3A45%3A16.927Z", date: "September 2024" },
    { name: "Daily Quiz", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailyquizimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHlxdWl6aW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU2OTAwODIsImV4cCI6MTc1NzIyNjA4Mn0.Pd1SiAgUnY8OeTe7CrOYIzgibXJ2SOPxKPw4SKcKEwU&t=2024-09-07T06%3A21%3A22.177Z", date: "September 2024" },
  ];

  const handleChallengeClick = (challengeName) => {
    if (challengeName === "Daily Walk") {
      navigate('/daily-walk-challenge');
    } else if (challengeName === "Daily Quiz") {
      navigate('/daily-quiz-challenge');
    }
    onClose();
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
                style={{ border: 'none' }}
              >
                {isFollowing ? 'Following' : 'Follow'}
                {!isFollowing && <Plus className="h-4 w-4 ml-1" />}
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
                onClick={() => {
                  navigate('/achievements');
                  onClose();
                }}
              >
                <Trophy className="w-10 h-10 stroke-[0.5]" />
              </div>
              <span className="text-xs mt-2">Achievements</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-sm text-gray-400 uppercase mb-4">ACTIVE</h2>
            <div className="grid grid-cols-1 gap-4">
              {activeChallenges.map((challenge, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between h-12 border border-gray-700 rounded-lg p-2 cursor-pointer"
                  onClick={() => handleChallengeClick(challenge.name)}
                >
                  <div>
                    <p className="text-sm">{challenge.name}</p>
                    <p className="text-xs text-gray-400">{challenge.date}</p>
                  </div>
                  <img src={challenge.image} alt={challenge.name} className="w-8 h-8 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePopup;
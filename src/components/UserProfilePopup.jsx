import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const getGradient = (name) => {
  const charCode = name.charCodeAt(0);
  const hue1 = (charCode * 7) % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
};

const UserProfilePopup = ({ isOpen, onClose, user }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      controls.start({ opacity: 1, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      controls.start({ opacity: 0, y: "100%" });
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, controls]);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    } else {
      controls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
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
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <motion.div
        ref={constraintsRef}
        initial={{ opacity: 0, y: 0 }}
        animate={controls}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ 
          opacity: { duration: 0.2 },
          y: { type: "spring", damping: 30, stiffness: 300 }
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        className={`fixed inset-x-0 bottom-0 bg-black text-white z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ touchAction: 'none', height: '90vh', width: '100%' }}
      >
        <div className="h-full overflow-y-auto" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
          <div className="p-4 flex flex-col h-full w-full max-w-3xl mx-auto">
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-8" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-light">{user.username}</h1>
                <p className="text-sm text-gray-400 mb-4">{user.handle}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`text-xs hover:bg-gray-600 transition-colors h-8 rounded-full w-32 flex justify-between items-center px-4 ${
                    isFollowing ? 'bg-transparent border border-gray-600 text-gray-400' : 'bg-gray-700 text-white'
                  }`}
                  onClick={toggleFollow}
                  style={{ border: isFollowing ? '1px solid #4B5563' : 'none' }}
                >
                  <span className="text-xs">{isFollowing ? 'Following' : 'Follow'}</span>
                  {!isFollowing && <Plus className="h-4 w-4" />}
                </Button>
              </div>
              <Avatar className="w-20 h-20 rounded-full">
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} />
                ) : (
                  <AvatarFallback style={{ background: getGradient(user.username) }} className="text-white font-semibold">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="flex mb-16">
              <div className="mr-24">
                <p className="text-sm text-gray-400 uppercase mb-1">Followers</p>
                <p className="text-sm">{user.followers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase mb-1">Following</p>
                <p className="text-sm">{user.following}</p>
              </div>
            </div>
            
            <div className="flex mb-8 space-x-8">
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
                <div className="flex items-center mt-2">
                  <span className="text-xs">Achievements</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
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
    </>
  );
};

export default UserProfilePopup;
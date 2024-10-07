import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings, Trophy, Sparkles, Medal, Star, FileSearch, Smartphone } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import FeatureButton from '../components/FeatureButton';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState("https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z");
  const displayName = "GeonuBae";
  const memberSince = "2023";
  const titles = 29;
  const badges = 3;
  const navigate = useNavigate();

  const featureButtons = [
    { icon: Trophy, label: "Achievements", color: "from-yellow-400 to-orange-500" },
    { icon: Sparkles, label: "Challenges", color: "from-purple-400 to-pink-500" },
    { icon: Medal, label: "Leaderboard", color: "from-blue-400 to-indigo-500" },
    { icon: Star, label: "Rewards", color: "from-green-400 to-teal-500" },
    { icon: FileSearch, label: "Activity Log", color: "from-red-400 to-pink-500" },
    { icon: Smartphone, label: "Connected Apps", color: "from-indigo-400 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF8F3] via-[#F0E7E0] to-[#E6D0C5] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-end mb-4"
          >
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <Avatar className="w-32 h-32 mb-3 ring-4 ring-white shadow-lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">{displayName[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-1">{displayName}</h1>
            <p className="text-sm text-gray-600 mb-4">Member since {memberSince}</p>
            
            <div className="flex justify-center w-full mb-6">
              <motion.div 
                className="text-center mr-12"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">{titles}</p>
                <p className="text-xs text-gray-600">Titles</p>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">{badges}</p>
                <p className="text-xs text-gray-600">Badges</p>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full my-6"></div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {featureButtons.map((button, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FeatureButton icon={button.icon} label={button.label} gradientColors={button.color} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings, Sparkles, Beaker, FileSearch, Music, Smartphone, LayoutGrid } from "lucide-react";
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
    { icon: Sparkles, label: "Button 1" },
    { icon: Beaker, label: "Button 2" },
    { icon: FileSearch, label: "Button 3" },
    { icon: Music, label: "Button 4" },
    { icon: Smartphone, label: "Button 5" },
    { icon: LayoutGrid, label: "Button 6" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-white hover:bg-transparent"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-3">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-3xl bg-blue-600">{displayName[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold mb-1">{displayName}</h1>
            <p className="text-xs text-gray-400 mb-4">Member since {memberSince}</p>
            
            <div className="flex justify-center w-full mb-4">
              <div className="text-center mr-12">
                <p className="text-2xl font-bold">{titles}</p>
                <p className="text-xs text-gray-400">Titles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{badges}</p>
                <p className="text-xs text-gray-400">Badges</p>
              </div>
            </div>
          </div>
          
          <div className="h-px bg-gray-800 w-full my-4"></div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {featureButtons.map((button, index) => (
              <FeatureButton key={index} icon={button.icon} label={button.label} />
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
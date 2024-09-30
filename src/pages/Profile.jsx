import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState("https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z");
  const displayName = "GeonuBae";
  const memberSince = "2023";
  const titles = 29;
  const badges = 3;
  const navigate = useNavigate();

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
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-4xl bg-blue-600">{displayName[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
            <p className="text-gray-400 mb-8">Member since {memberSince}</p>
            
            <div className="flex justify-center w-full mb-8">
              <div className="text-center mr-16">
                <p className="text-4xl font-bold">{titles}</p>
                <p className="text-gray-400">Titles</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">{badges}</p>
                <p className="text-gray-400">Badges</p>
              </div>
            </div>
          </div>
          
          <div className="h-px bg-gray-800 w-full my-8"></div>
          
          {/* Add more profile content here */}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
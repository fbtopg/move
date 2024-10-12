import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings, Star, Users, Flag, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const avatarUrl = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";
  const displayName = "GeonuBae";
  const memberSince = "2023";

  const profileItems = [
    { icon: FileText, label: "Summary", route: "/profile/summary" },
    { icon: Users, label: "Groups", route: "/profile/groups" },
    { icon: Flag, label: "Challenges", route: "/profile/challenges" },
    { icon: Star, label: "Rewards", route: "/rewards" },
  ];

  return (
    <div className="min-h-screen bg-[#FEF8F3] dark:bg-gray-900 text-foreground dark:text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="w-32 h-32 mb-3 ring-4 ring-white dark:ring-gray-800 shadow-lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">{displayName[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-1">{displayName}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Member since {memberSince}</p>
          </div>
          
          <div className="space-y-4">
            {profileItems.map((item, index) => (
              <Button
                key={index}
                className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between px-4 py-3 rounded-lg shadow-sm"
                onClick={() => navigate(item.route)}
              >
                <span className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </span>
                <span className="text-gray-400 dark:text-gray-500">→</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings, Trophy, Medal, Star, Users, Flag } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const avatarUrl = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";
  const displayName = "GeonuBae";
  const memberSince = "2023";

  const profileItems = [
    { icon: Trophy, label: "Achievements", route: "/achievements" },
    { icon: Medal, label: "Leaderboard", route: "/leaderboard" },
    { icon: Star, label: "Rewards", route: "/rewards" },
  ];

  const groups = [
    { name: "Morning chill", members: 5 },
    { name: "Climbing bros", members: 8 },
    { name: "Trip", members: 3 },
  ];

  const challenges = [
    { name: "Daily Walk Challenge", progress: "15/30 days" },
    { name: "Quiz Master", progress: "Level 5" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF8F3] via-[#F0E7E0] to-[#E6D0C5] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="w-32 h-32 mb-3 ring-4 ring-white shadow-lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">{displayName[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-1">{displayName}</h1>
            <p className="text-sm text-gray-600 mb-4">Member since {memberSince}</p>
          </div>
          
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <div className="space-y-4">
                {profileItems.map((item, index) => (
                  <Button
                    key={index}
                    className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between px-4 py-3 rounded-lg shadow-sm"
                    onClick={() => navigate(item.route)}
                  >
                    <span className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </span>
                    <span className="text-gray-400">→</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="groups">
              <div className="space-y-4">
                {groups.map((group, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.members} members</p>
                    </div>
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="challenges">
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{challenge.name}</h3>
                      <p className="text-sm text-gray-600">{challenge.progress}</p>
                    </div>
                    <Flag className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
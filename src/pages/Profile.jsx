import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings, Star, Users, Flag, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const userAvatarUrl = session?.user?.user_metadata?.avatar_url;
  const displayName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || "User";
  const memberSince = new Date(session?.user?.created_at).getFullYear().toString() || "2023";

  const profileItems = [
    { icon: FileText, label: "Summary", route: "/profile/summary" },
    { icon: Users, label: "Groups", route: "/profile/groups" },
    { icon: Flag, label: "Challenges", route: "/profile/challenges" },
    { icon: Star, label: "Rewards", route: "/rewards" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="w-32 h-32 mb-3 ring-4 ring-white shadow-lg">
              <AvatarImage src={userAvatarUrl} alt={displayName} className="object-cover" />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {displayName[0]}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-1">{displayName}</h1>
            <p className="text-sm text-gray-600 mb-4">Member since {memberSince}</p>
          </div>
          
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
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
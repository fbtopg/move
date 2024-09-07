import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const username = "Username";
  const followers = 57;
  const following = 151;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-end mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-white hover:bg-transparent"
            >
              <MoreHorizontal className="h-6 w-6 stroke-[1]" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-light">{username}</h1>
            <Avatar className="w-20 h-20 rounded-full">
              <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z" />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex mb-12">
            <div className="mr-24">
              <p className="text-sm text-gray-400 uppercase mb-1">Followers</p>
              <p className="text-sm">{followers}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase mb-1">Following</p>
              <p className="text-sm">{following}</p>
            </div>
          </div>
          
          {/* Add more profile content here */}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;
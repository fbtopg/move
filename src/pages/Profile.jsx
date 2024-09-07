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
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-light">{username}</h1>
            <Avatar className="w-20 h-20">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex justify-between mb-12">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">{followers}</p>
              <p className="text-sm text-gray-400 uppercase">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">{following}</p>
              <p className="text-sm text-gray-400 uppercase">Following</p>
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
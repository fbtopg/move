import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
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
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} />
                <AvatarFallback>PFP</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-normal">{username}</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-white hover:bg-gray-800"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex justify-center space-x-12 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{followers}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{following}</p>
              <p className="text-sm text-gray-400">Following</p>
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
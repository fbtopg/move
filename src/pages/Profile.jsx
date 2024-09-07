import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const username = "Username";
  const followers = 57;
  const following = 151;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-2xl font-bold">{username}</h1>
            <button className="text-2xl">...</button>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-400">FOLLOWERS</p>
              <p className="text-2xl font-bold">{followers}</p>
            </div>
            <Avatar className="w-24 h-24">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm text-gray-400">FOLLOWING</p>
              <p className="text-2xl font-bold">{following}</p>
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
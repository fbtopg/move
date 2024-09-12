import React, { useState } from 'react';
import InviteFriends from '../components/InviteFriends';
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Friends from './Friends';
import Me from './Me';
import UserProfilePopup from '../components/UserProfilePopup';
import { getRandomProfilePicture } from '../utils/profilePictures';

const Index = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [currentView, setCurrentView] = useState('friends');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: getRandomProfilePicture(),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  return (
    <div className="min-h-screen bg-[#212124] flex flex-col">
      <div className="sticky top-0 bg-[#212124] z-10 p-2">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              className={`text-lg font-bold ${currentView === 'friends' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setCurrentView('friends')}
            >
              Friends
            </button>
            <button
              className={`text-lg font-bold ${currentView === 'me' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setCurrentView('me')}
            >
              Me
            </button>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsInviteOpen(true)}
            className="hover:bg-transparent p-1.5"
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="max-w-md mx-auto p-2">
          {currentView === 'friends' ? (
            <Friends onUserClick={handleUserClick} />
          ) : (
            <Me />
          )}
        </div>
      </div>
      <InviteFriends isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {selectedUser && (
        <UserProfilePopup
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Index;
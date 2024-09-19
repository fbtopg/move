import React, { useState } from 'react';
import InviteFriends from '../components/InviteFriends';
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Friends from './Friends';
import UserProfilePopup from '../components/UserProfilePopup';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import DailyWalkChallenge from './DailyWalkChallenge';
import DailyQuizChallenge from './DailyQuizChallenge';

const Index = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [activeTopTab, setActiveTopTab] = useState('all');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();

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
    <div className="min-h-screen bg-black flex flex-col">
      <div className="sticky top-0 bg-black z-10 p-2">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex">
            <button
              className={`mr-4 text-sm ${activeTopTab === 'all' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTopTab('all')}
            >
              All
            </button>
            <button
              className={`text-sm ${activeTopTab === 'friends' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTopTab('friends')}
            >
              Friends
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
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Friends onUserClick={handleUserClick} />} />
              <Route path="/daily-walk-challenge" element={<DailyWalkChallenge />} />
              <Route path="/daily-quiz-challenge" element={<DailyQuizChallenge />} />
            </Routes>
          </AnimatePresence>
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

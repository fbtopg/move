import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import Community from './Community';
import UserProfilePopup from '../components/UserProfilePopup';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import DailyWalkChallenge from './DailyWalkChallenge';
import DailyQuizChallenge from './DailyQuizChallenge';

const Index = () => {
  const [activeTab, setActiveTab] = useState('community');
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
    <div className="min-h-screen bg-[#FEF8F3] flex flex-col">
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Community onUserClick={handleUserClick} />} />
              <Route path="/daily-walk-challenge" element={<DailyWalkChallenge />} />
              <Route path="/daily-quiz-challenge" element={<DailyQuizChallenge />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
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
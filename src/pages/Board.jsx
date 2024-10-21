import React from 'react';
import { motion } from 'framer-motion';
import BottomNavBar from '../components/BottomNavBar';
import ChallengeCardPreview from '../components/ChallengeCardPreview';
import MainHeader from '../components/MainHeader';
import { useNavigate } from 'react-router-dom';

const Board = ({ openLoginModal }) => {
  const navigate = useNavigate();

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground flex flex-col">
      <MainHeader 
        openLoginModal={openLoginModal} 
        onNotificationsClick={handleNotificationsClick}
      />
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <motion.h2 
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Challenges
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <ChallengeCardPreview onLoginRequired={openLoginModal} />
          </motion.div>
        </div>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
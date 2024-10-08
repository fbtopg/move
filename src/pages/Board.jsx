import React from 'react';
import { motion } from 'framer-motion';
import CommunityHeader from '../components/CommunityHeader';
import BottomNavBar from '../components/BottomNavBar';
import ChallengeCard from '../components/ChallengeCard';

const Board = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground flex flex-col">
      <CommunityHeader />
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-4">
          <motion.h2 
            className="text-2xl font-bold mb-8" // Changed from mb-6 to mb-8
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
          >
            <ChallengeCard />
          </motion.div>
        </div>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
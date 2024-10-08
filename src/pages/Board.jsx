import React from 'react';
import { motion } from 'framer-motion';
import CommunityHeader from '../components/CommunityHeader';
import ChallengeCard from '../components/ChallengeCard';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const navigate = useNavigate();

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30", status: "ongoing" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30", status: "ongoing" },
    { type: "Daily Walk", date: "AUGUST 2024", active: "15.8k", progress: "28/31", status: "finished" },
    { type: "Daily Quiz", date: "AUGUST 2024", active: "15.8k", progress: "28/31", status: "finished" },
  ];

  const handleChallengeClick = (type, date) => {
    if (type === "Daily Walk") {
      navigate('/daily-walk-challenge');
    } else if (type === "Daily Quiz") {
      navigate('/daily-quiz-challenge');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <CommunityHeader />
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6">Challenges</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold mb-3 text-gray-400">ONGOING</h3>
              {challenges
                .filter(challenge => challenge.status === "ongoing")
                .map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mb-4"
                    onClick={() => handleChallengeClick(challenge.type, challenge.date)}
                  >
                    <ChallengeCard {...challenge} />
                  </motion.div>
                ))
              }
            </div>

            <div className="h-px bg-gray-700 my-6"></div>

            <div>
              <h3 className="text-xs font-semibold mb-3 text-gray-400">FINISHED</h3>
              {challenges
                .filter(challenge => challenge.status === "finished")
                .map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mb-4"
                    onClick={() => handleChallengeClick(challenge.type, challenge.date)}
                  >
                    <ChallengeCard {...challenge} />
                  </motion.div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
import React, { useState } from 'react';
import { motion } from "framer-motion";

const ChallengeProgress = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const challenges = [
    { type: "Daily Walk", rank: "1st/120.6k" },
    { type: "Daily Quiz", rank: "11th/120.6k" },
  ];

  const handleSwipe = (index) => {
    setCurrentChallenge(index);
  };

  return (
    <div className="mb-4">
      <motion.div
        className="overflow-hidden"
        onPanEnd={(e, { offset, velocity }) => {
          if (Math.abs(velocity.x) > 500) {
            handleSwipe(currentChallenge === 0 ? 1 : 0);
          } else if (Math.abs(offset.x) > 50) {
            handleSwipe(currentChallenge === 0 ? 1 : 0);
          }
        }}
      >
        <motion.div
          className="flex"
          animate={{ x: `${-currentChallenge * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {challenges.map((challenge, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="border border-gray-700 rounded-lg p-2 w-36 h-16 flex flex-col justify-between">
                <p className="text-[10px] text-gray-400">{challenge.type}</p>
                <p className="text-sm font-bold text-white mt-auto">{challenge.rank}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChallengeProgress;
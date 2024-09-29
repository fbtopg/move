import React, { useState } from 'react';
import { motion } from "framer-motion";

const ChallengeProgress = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const handleSwipe = (index) => {
    setCurrentChallenge(index);
  };

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold mb-3 text-gray-400">CHALLENGE PROGRESS</h2>
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
              <div className="border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">{challenge.type}</p>
                <p className="text-lg font-semibold">{challenge.date}</p>
                <p className="text-sm">Rank: {challenge.progress}</p>
                <p className="text-xs text-gray-400">{challenge.active} active</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="flex justify-center space-x-2 mt-2">
        {challenges.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentChallenge ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() => handleSwipe(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ChallengeProgress;
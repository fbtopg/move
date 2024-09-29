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
              <div className="border border-gray-700 rounded-lg p-2 w-32 h-20"> {/* Reduced width and height */}
                <p className="text-[8px] text-gray-400">{challenge.type}</p> {/* Reduced font size */}
                <p className="text-[10px] font-semibold">{challenge.date}</p> {/* Reduced font size */}
                <p className="text-[8px]">Rank: {challenge.progress}</p> {/* Reduced font size */}
                <p className="text-[8px] text-gray-400">{challenge.active} active</p> {/* Reduced font size */}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChallengeProgress;
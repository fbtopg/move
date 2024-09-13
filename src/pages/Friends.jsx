import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState('walks');

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentChallenge === 'walks') {
      setCurrentChallenge('quiz');
    } else if (direction === 'right' && currentChallenge === 'quiz') {
      setCurrentChallenge('walks');
    }
  };

  const activities = [
    { name: "John", activity: "finished walking 1km and completed daily walks challenge • 3m", type: "walk" },
    { name: "Tate", activity: "finished walking 500m and completed daily walks challenge • 4m", type: "walk" },
    { name: "Aquafina", activity: "finished walking 1km and completed daily walks challenge • 59m", type: "walk" },
    { name: "Geonu", activity: "finished walking 750m and completed daily walks challenge • 4h", type: "walk" },
    { name: "Astrid", activity: "finished walking 2km and completed daily walks challenge • 5h", type: "walk" },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz challenge • 10h", type: "quiz" },
    { name: "Rissa", activity: "solved the quiz today and completed daily quiz challenge • 15h", type: "quiz" },
  ];

  return (
    <>
      <motion.div
        className="overflow-hidden"
        onPanEnd={(e, { offset, velocity }) => {
          if (Math.abs(velocity.x) > 500) {
            handleSwipe(velocity.x > 0 ? 'right' : 'left');
          } else if (Math.abs(offset.x) > 50) {
            handleSwipe(offset.x > 0 ? 'right' : 'left');
          }
        }}
      >
        <motion.div
          className="flex"
          animate={{ x: currentChallenge === 'walks' ? 0 : '-100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex-shrink-0 w-full">
            <div className="mb-4">
              <ChallengeCard
                type="Daily Walks"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="501/16.5K"
              />
            </div>
          </div>
          <div className="flex-shrink-0 w-full">
            <div className="mb-4">
              <ChallengeCard
                type="Daily Quiz"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="11/30"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="h-px bg-gray-700 my-4"></div>

      <section className="mt-4 pb-20">
        <h2 className="text-xs font-semibold mb-3 text-gray-400">TODAY</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <FriendActivity
              key={index}
              name={activity.name}
              activity={activity.activity}
              type={activity.type}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Friends;
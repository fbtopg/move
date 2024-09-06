import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';

const Index = () => {
  const [currentChallenge, setCurrentChallenge] = useState('walks');

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentChallenge === 'quiz') {
      setCurrentChallenge('walks');
    } else if (direction === 'right' && currentChallenge === 'walks') {
      setCurrentChallenge('quiz');
    }
  };

  const activities = [
    { name: "John", activity: "finished walking 1km and completed daily walks challenge", time: "3m", type: "walk" },
    { name: "Tate", activity: "finished walking 500m and completed daily walks challenge", time: "4m", type: "walk" },
    { name: "Aquafina", activity: "finished walking 1km and completed daily walks challenge", time: "59m", type: "walk" },
    { name: "Geonu", activity: "finished walking 750m and completed daily walks challenge", time: "4h", type: "walk" },
    { name: "Astrid", activity: "finished walking 2km and completed daily walks challenge", time: "5h", type: "walk" },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz challenge", time: "10h", type: "quiz" },
    { name: "Rissa", activity: "solved the quiz today and completed daily quiz challenge", time: "15h", type: "quiz" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Friends</h1>
          <span className="text-gray-500">Me</span>
          <button className="text-2xl">+</button>
        </header>

        <AnimatePresence initial={false}>
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, x: currentChallenge === 'walks' ? -300 : 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentChallenge === 'walks' ? 300 : -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleSwipe('right');
              } else if (swipe > swipeConfidenceThreshold) {
                handleSwipe('left');
              }
            }}
          >
            {currentChallenge === 'walks' ? (
              <ChallengeCard
                type="Daily Walks"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="501/16.5K"
              />
            ) : (
              <ChallengeCard
                type="Daily Quiz"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="11/30"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">TODAY</h2>
          {activities.map((activity, index) => (
            <FriendActivity
              key={index}
              name={activity.name}
              activity={activity.activity}
              time={activity.time}
              type={activity.type}
              liked={index === 0}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default Index;
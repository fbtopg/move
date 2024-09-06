import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [currentChallenge, setCurrentChallenge] = useState('walks');
  const [activeTab, setActiveTab] = useState('friends');

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
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              className={`text-sm ${activeTab === 'friends' ? 'font-bold' : 'font-normal'}`}
              onClick={() => setActiveTab('friends')}
            >
              Friends
            </button>
            <button
              className={`text-sm ${activeTab === 'me' ? 'font-bold' : 'font-normal'}`}
              onClick={() => setActiveTab('me')}
            >
              Me
            </button>
          </div>
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {activeTab === 'friends' ? (
          <>
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
                <div className="bg-transparent">
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
                </div>
              </motion.div>
            </AnimatePresence>

            <section className="mt-6">
              <h2 className="text-lg font-semibold mb-3">TODAY</h2>
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
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold">Your Activity</h2>
            <p className="mt-4">Your personal activity will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default Index;
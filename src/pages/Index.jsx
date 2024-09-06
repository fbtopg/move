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
    { name: "John", activity: "finished walking 1km and completed daily walks challenge • 3m", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Tate", activity: "finished walking 500m and completed daily walks challenge • 4m", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Aquafina", activity: "finished walking 1km and completed daily walks challenge • 59m", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Geonu", activity: "finished walking 750m and completed daily walks challenge • 4h", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Astrid", activity: "finished walking 2km and completed daily walks challenge • 5h", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz challenge • 10h", type: "quiz", gradientColor: ['#2196F3', '#64B5F6'] },
    { name: "Rissa", activity: "solved the quiz today and completed daily quiz challenge • 15h", type: "quiz", gradientColor: ['#2196F3', '#64B5F6'] },
  ];

  const renderContent = () => (
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
            <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
              <ChallengeCard
                type="Daily Walks"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="501/16.5K"
                gradientColor={['#4CAF50', '#81C784']}
              />
            </div>
          </div>
          <div className="flex-shrink-0 w-full">
            <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
              <ChallengeCard
                type="Daily Quiz"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="11/30"
                gradientColor={['#2196F3', '#64B5F6']}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <section className="mt-6 bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-3 text-white">TODAY</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <FriendActivity
              key={index}
              name={activeTab === 'friends' ? activity.name : "You"}
              activity={activity.activity}
              type={activity.type}
              liked={index === 0}
              gradientColor={activity.gradientColor}
            />
          ))}
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              className={`text-sm ${activeTab === 'friends' ? 'font-bold' : 'font-normal'} text-white`}
              onClick={() => setActiveTab('friends')}
            >
              Friends
            </button>
            <button
              className={`text-sm ${activeTab === 'me' ? 'font-bold' : 'font-normal'} text-white`}
              onClick={() => setActiveTab('me')}
            >
              Me
            </button>
          </div>
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5 text-white" />
          </Button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
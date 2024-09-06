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
    { name: "John", activity: "finished walking 1km and completed daily walks challenge", time: "3m", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Tate", activity: "finished walking 500m and completed daily walks challenge", time: "4m", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Aquafina", activity: "finished walking 1km and completed daily walks challenge", time: "59m", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Geonu", activity: "finished walking 750m and completed daily walks challenge", time: "4h", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Astrid", activity: "finished walking 2km and completed daily walks challenge", time: "5h", type: "walk", gradientColor: ['#4CAF50', '#81C784'] },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz challenge", time: "10h", type: "quiz", gradientColor: ['#2196F3', '#64B5F6'] },
    { name: "Rissa", activity: "solved the quiz today and completed daily quiz challenge", time: "15h", type: "quiz", gradientColor: ['#2196F3', '#64B5F6'] },
  ];

  const renderContent = () => (
    <>
      <AnimatePresence initial={false} custom={currentChallenge}>
        <motion.div
          key={currentChallenge}
          custom={currentChallenge}
          initial={(custom) => ({
            opacity: 0,
            x: custom === 'walks' ? -300 : 300
          })}
          animate={{ opacity: 1, x: 0 }}
          exit={(custom) => ({
            opacity: 0,
            x: custom === 'walks' ? 300 : -300
          })}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            {currentChallenge === 'walks' ? (
              <ChallengeCard
                type="Daily Walks"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="501/16.5K"
                gradientColor={['#4CAF50', '#81C784']}
              />
            ) : (
              <ChallengeCard
                type="Daily Quiz"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="11/30"
                gradientColor={['#2196F3', '#64B5F6']}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <section className="mt-6 bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-3 text-white">TODAY</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <FriendActivity
              key={index}
              name={activeTab === 'friends' ? activity.name : "You"}
              activity={activity.activity}
              time={activity.time}
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
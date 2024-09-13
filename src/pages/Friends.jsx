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

  const todayActivities = [
    { name: "John", activity: "finished walking 1km and completed daily walk. 3m", type: "walk" },
    { name: "Tate", activity: "finished walking 500m and completed daily walk. 4m", type: "walk" },
    { name: "Aquafina", activity: "finished walking 1km and completed daily walk. 59m", type: "walk" },
    { name: "Geonu", activity: "solved the quiz today and completed daily quiz. 1h", type: "quiz" },
    { name: "Astrid", activity: "finished walking 1.5km and completed daily walk. 2h", type: "walk" },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz. 3h", type: "quiz" },
    { name: "Rissa", activity: "finished walking 800m and completed daily walk. 4h", type: "walk" },
    { name: "Emma", activity: "solved the quiz today and completed daily quiz. 5h", type: "quiz" },
  ];

  const thisMonthActivities = [
    { name: "Geonu", activity: "finished walking 750m and completed daily walk. 2d", type: "walk" },
    { name: "Astrid", activity: "finished walking 2km and completed daily walk. 5d", type: "walk" },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz. 1w", type: "quiz" },
    { name: "Rissa", activity: "finished walking 1.2km and completed daily walk. 1w", type: "walk" },
    { name: "John", activity: "solved the quiz today and completed daily quiz. 2w", type: "quiz" },
    { name: "Tate", activity: "finished walking 900m and completed daily walk. 3w", type: "walk" },
    { name: "Emma", activity: "finished walking 1.3km and completed daily walk. 3w", type: "walk" },
    { name: "Aquafina", activity: "solved the quiz today and completed daily quiz. 4w", type: "quiz" },
  ];

  const earlierActivities = [
    { name: "Rissa", activity: "solved the quiz today and completed daily quiz. 2w", type: "quiz" },
    { name: "John", activity: "finished walking 1.5km and completed daily walk. 3w", type: "walk" },
    { name: "Tate", activity: "solved the quiz today and completed daily quiz. 1m", type: "quiz" },
    { name: "Aquafina", activity: "finished walking 2km and completed daily walk. 1m", type: "walk" },
    { name: "Geonu", activity: "solved the quiz today and completed daily quiz. 2m", type: "quiz" },
    { name: "Astrid", activity: "finished walking 1.8km and completed daily walk. 2m", type: "walk" },
    { name: "Emma", activity: "solved the quiz today and completed daily quiz. 3m", type: "quiz" },
    { name: "Fitra", activity: "finished walking 1.7km and completed daily walk. 3m", type: "walk" },
  ];

  const renderActivitySection = (title, activities) => (
    <>
      <h2 className="text-xs font-semibold mb-3 text-gray-400">{title}</h2>
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
    </>
  );

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
                type="Daily Walk"
                date="SEPTEMBER 2024"
                active="16.5k"
                progress="501/16.5K"
                currentIndex={currentChallenge === 'walks' ? 0 : 1}
                totalCards={2}
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
                currentIndex={currentChallenge === 'quiz' ? 1 : 0}
                totalCards={2}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="h-px bg-gray-700 my-4"></div>

      <section className="mt-4 pb-20 space-y-6">
        {renderActivitySection("TODAY", todayActivities)}
        <div className="h-px bg-gray-700"></div>
        {renderActivitySection("THIS MONTH", thisMonthActivities)}
        <div className="h-px bg-gray-700"></div>
        {renderActivitySection("EARLIER", earlierActivities)}
      </section>
    </>
  );
};

export default Friends;
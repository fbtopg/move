import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { Loader2 } from 'lucide-react';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState({
    today: [],
    thisMonth: [],
    earlier: [],
  });

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const handleSwipe = (index) => {
    setCurrentChallenge(index);
  };

  const loadMoreActivities = () => {
    setIsLoading(true);
    // Simulating an API call
    setTimeout(() => {
      const newActivities = {
        today: [
          { name: "John", activity: "finished walking 1km and completed daily walk. 3m", type: "walk" },
          { name: "Tate", activity: "solved the quiz today and completed daily quiz. 4m", type: "quiz" },
          ...activities.today,
        ],
        thisMonth: [
          { name: "Geonu", activity: "finished walking 750m and completed daily walk. 2d", type: "walk" },
          { name: "Astrid", activity: "solved the quiz today and completed daily quiz. 5d", type: "quiz" },
          ...activities.thisMonth,
        ],
        earlier: [
          { name: "Rissa", activity: "solved the quiz today and completed daily quiz. 2w", type: "quiz" },
          { name: "John", activity: "finished walking 1.5km and completed daily walk. 3w", type: "walk" },
          ...activities.earlier,
        ],
      };
      setActivities(newActivities);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreActivities();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activities]);

  useEffect(() => {
    loadMoreActivities();
  }, []);

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
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-16 bg-black z-50">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      )}
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
              <div className="mb-4">
                <ChallengeCard {...challenge} />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="flex justify-center space-x-2 mb-4">
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

      <div className="h-px bg-gray-700 my-4"></div>

      <section className="mt-4 pb-20 space-y-6">
        {renderActivitySection("TODAY", activities.today)}
        <div className="h-px bg-gray-700"></div>
        {renderActivitySection("THIS MONTH", activities.thisMonth)}
        <div className="h-px bg-gray-700"></div>
        {renderActivitySection("EARLIER", activities.earlier)}
      </section>
    </>
  );
};

export default Friends;
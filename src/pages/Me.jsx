import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';

const Me = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const handleSwipe = (index) => {
    setCurrentChallenge(index);
  };

  const userProfilePicture = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";

  const todayActivities = [
    { name: "You", activity: "finished walking 2km and completed daily walk • just now", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • just now", type: "quiz" },
    { name: "You", activity: "finished walking 1.5km and completed daily walk • just now", type: "walk" },
    { name: "You", activity: "finished walking 1.2km and completed daily walk • just now", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • just now", type: "quiz" },
    { name: "You", activity: "finished walking 800m and completed daily walk • just now", type: "walk" },
    { name: "You", activity: "finished walking 1km and completed daily walk • 3m", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 1h", type: "quiz" },
    { name: "You", activity: "finished walking 800m and completed daily walk • 2h", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 4h", type: "quiz" },
    { name: "You", activity: "finished walking 1.2km and completed daily walk • 5h", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 6h", type: "quiz" },
    { name: "You", activity: "finished walking 500m and completed daily walk • 7h", type: "walk" },
  ];

  const thisMonthActivities = [
    { name: "You", activity: "finished walking 750m and completed daily walk • 2d", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 5d", type: "quiz" },
    { name: "You", activity: "finished walking 1.5km and completed daily walk • 1w", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 1w", type: "quiz" },
    { name: "You", activity: "finished walking 900m and completed daily walk • 2w", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 3w", type: "quiz" },
    { name: "You", activity: "finished walking 1.1km and completed daily walk • 3w", type: "walk" },
  ];

  const earlierActivities = [
    { name: "You", activity: "finished walking 2km and completed daily walk • 2w", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 1m", type: "quiz" },
    { name: "You", activity: "finished walking 1.8km and completed daily walk • 1m", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 2m", type: "quiz" },
    { name: "You", activity: "finished walking 1.3km and completed daily walk • 2m", type: "walk" },
    { name: "You", activity: "solved the quiz today and completed daily quiz • 3m", type: "quiz" },
    { name: "You", activity: "finished walking 1.6km and completed daily walk • 3m", type: "walk" },
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
            profilePicture={userProfilePicture}
            isOwnActivity={true}
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

      <div className="h-2 bg-[#17171A] my-4 -mx-2"></div>

      <section className="mt-4 pb-20 space-y-6">
        {renderActivitySection("TODAY", todayActivities)}
        <div className="h-2 bg-[#17171A] -mx-2"></div>
        {renderActivitySection("THIS MONTH", thisMonthActivities)}
        <div className="h-2 bg-[#17171A] -mx-2"></div>
        {renderActivitySection("EARLIER", earlierActivities)}
      </section>
    </>
  );
};

export default Me;
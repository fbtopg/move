import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { getRandomProfilePicture } from '../utils/profilePictures';
import UserProfilePopup from '../components/UserProfilePopup';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const handleSwipe = (index) => {
    setCurrentChallenge(index);
  };

  const todayActivities = [
    { name: "Emma", activity: "finished walking 1.2km and completed daily walk • just now", type: "walk" },
    { name: "John", activity: "solved the quiz today and completed daily quiz • just now", type: "quiz" },
    { name: "Sarah", activity: "finished walking 800m and completed daily walk • just now", type: "walk" },
    { name: "John", activity: "finished walking 1km and completed daily walk • 3m", type: "walk" },
    { name: "Tate", activity: "finished walking 500m and completed daily walk • 4m", type: "walk" },
    { name: "Aquafina", activity: "finished walking 1km and completed daily walk • 59m", type: "walk" },
    { name: "Geonu", activity: "solved the quiz today and completed daily quiz • 1h", type: "quiz" },
    { name: "Astrid", activity: "finished walking 1.5km and completed daily walk • 2h", type: "walk" },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz • 3h", type: "quiz" },
    { name: "Rissa", activity: "finished walking 800m and completed daily walk • 4h", type: "walk" },
    { name: "Emma", activity: "solved the quiz today and completed daily quiz • 5h", type: "quiz" },
  ];

  const thisMonthActivities = [
    { name: "Geonu", activity: "finished walking 750m and completed daily walk • 2d", type: "walk" },
    { name: "Astrid", activity: "finished walking 2km and completed daily walk • 5d", type: "walk" },
    { name: "Fitra", activity: "solved the quiz today and completed daily quiz • 1w", type: "quiz" },
    { name: "Rissa", activity: "finished walking 1.2km and completed daily walk • 1w", type: "walk" },
    { name: "John", activity: "solved the quiz today and completed daily quiz • 2w", type: "quiz" },
    { name: "Tate", activity: "finished walking 900m and completed daily walk • 3w", type: "walk" },
    { name: "Emma", activity: "finished walking 1.3km and completed daily walk • 3w", type: "walk" },
    { name: "Aquafina", activity: "solved the quiz today and completed daily quiz • 4w", type: "quiz" },
  ];

  const earlierActivities = [
    { name: "Rissa", activity: "solved the quiz today and completed daily quiz • 2w", type: "quiz" },
    { name: "John", activity: "finished walking 1.5km and completed daily walk • 3w", type: "walk" },
    { name: "Tate", activity: "solved the quiz today and completed daily quiz • 1m", type: "quiz" },
    { name: "Aquafina", activity: "finished walking 2km and completed daily walk • 1m", type: "walk" },
    { name: "Geonu", activity: "solved the quiz today and completed daily quiz • 2m", type: "quiz" },
    { name: "Astrid", activity: "finished walking 1.8km and completed daily walk • 2m", type: "walk" },
    { name: "Emma", activity: "solved the quiz today and completed daily quiz • 3m", type: "quiz" },
    { name: "Fitra", activity: "finished walking 1.7km and completed daily walk • 3m", type: "walk" },
  ];

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: getRandomProfilePicture(),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

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
            profilePicture={Math.random() > 0.3 ? getRandomProfilePicture() : null}
            onUserClick={() => handleUserClick(activity)}
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

      <div className="h-px bg-[#424245] my-4"></div>

      <section className="mt-4 pb-20 space-y-6">
        {renderActivitySection("TODAY", todayActivities)}
        <div className="h-px bg-[#424245]"></div>
        {renderActivitySection("THIS MONTH", thisMonthActivities)}
        <div className="h-px bg-[#424245]"></div>
        {renderActivitySection("EARLIER", earlierActivities)}
      </section>

      {selectedUser && (
        <UserProfilePopup
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default Friends;
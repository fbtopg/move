import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { getRandomProfilePicture } from '../utils/profilePictures';
import UserProfilePopup from '../components/UserProfilePopup';
import { Button } from "@/components/ui/button";

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const activities = {
    today: [
      { name: "Emma", activity: "finished walking 1.2km and completed daily walk • just now", type: "walk" },
      { name: "John", activity: "solved the quiz today and completed daily quiz • just now", type: "quiz" },
      { name: "Sarah", activity: "finished walking 800m and completed daily walk • just now", type: "walk" },
      { name: "John", activity: "finished walking 1km and completed daily walk • 3m", type: "walk" },
      { name: "Tate", activity: "finished walking 500m and completed daily walk • 4m", type: "walk" },
    ],
    thisMonth: [
      { name: "Geonu", activity: "finished walking 750m and completed daily walk • 2d", type: "walk" },
      { name: "Astrid", activity: "finished walking 2km and completed daily walk • 5d", type: "walk" },
      { name: "Fitra", activity: "solved the quiz today and completed daily quiz • 1w", type: "quiz" },
      { name: "Rissa", activity: "finished walking 1.2km and completed daily walk • 1w", type: "walk" },
    ],
    earlier: [
      { name: "Rissa", activity: "solved the quiz today and completed daily quiz • 2w", type: "quiz" },
      { name: "John", activity: "finished walking 1.5km and completed daily walk • 3w", type: "walk" },
      { name: "Tate", activity: "solved the quiz today and completed daily quiz • 1m", type: "quiz" },
      { name: "Aquafina", activity: "finished walking 2km and completed daily walk • 1m", type: "walk" },
    ],
  };

  const handleSwipe = (index) => setCurrentChallenge(index);

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

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  return (
    <>
      <div className="relative mb-16">
        <motion.div
          className="overflow-hidden"
          onPanEnd={(e, { offset, velocity }) => {
            if (Math.abs(velocity.x) > 500 || Math.abs(offset.x) > 50) {
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
                <ChallengeCard {...challenge} />
              </div>
            ))}
          </motion.div>
        </motion.div>
        <Button
          onClick={handleCreateGroup}
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 w-5/6 bg-[#212124] text-white hover:bg-[#2c2c2f] transition-colors h-16 rounded-full flex items-center justify-center"
        >
          Create Group
        </Button>
      </div>

      <section className="mt-4 pb-20 space-y-6">
        {renderActivitySection("TODAY", activities.today)}
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-px bg-[#212124] my-6" />
        {renderActivitySection("THIS MONTH", activities.thisMonth)}
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-px bg-[#212124] my-6" />
        {renderActivitySection("EARLIER", activities.earlier)}
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

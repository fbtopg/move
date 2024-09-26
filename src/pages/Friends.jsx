import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { getRandomProfilePicture } from '../utils/profilePictures';
import UserProfilePopup from '../components/UserProfilePopup';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import GroupButton from '../components/GroupButton';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scrollX, setScrollX] = useState(0);

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const groups = [
    { name: "Fitness Buddies", members: 120 },
    { name: "Book Club", members: 45 },
    { name: "Tech Enthusiasts", members: 78 },
    { name: "Foodies Unite", members: 92 },
    { name: "Travel Explorers", members: 63 },
  ];

  const handleNextChallenge = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
  };

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: getRandomProfilePicture(),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

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
      <div className="relative mb-4">
        <motion.div
          className="overflow-hidden"
          animate={{ x: `${-currentChallenge * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <ChallengeCard {...challenge} onNextChallenge={handleNextChallenge} />
              </div>
            ))}
          </div>
        </motion.div>
        <Button
          onClick={handleCreateGroup}
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-[96%] bg-[#212124] text-gray-400 hover:bg-[#2c2c2f] transition-colors h-20 rounded-full flex items-center justify-center border-8 border-black text-lg"
          style={{ borderWidth: '8px' }}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Group
        </Button>
      </div>

      <div className="mb-6 mt-14 overflow-x-auto scrollbar-hide">
        <motion.div
          className="flex space-x-2"
          drag="x"
          dragConstraints={{ right: 0, left: -((groups.length - 1) * 150) }}
          onDrag={(e, { point }) => setScrollX(point.x)}
        >
          {groups.map((group, index) => (
            <GroupButton key={index} name={group.name} members={group.members} />
          ))}
        </motion.div>
      </div>

      <section className="mt-4 pb-20 space-y-6 px-4">
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

import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import { getRandomProfilePicture } from '../utils/profilePictures';
import UserProfilePopup from '../components/UserProfilePopup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';
import FilterButton from '../components/FilterButton';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const filters = [
    { name: "Hot", emoji: "🔥", color: "bg-green-500" },
    { name: "New", emoji: "✨", color: "bg-blue-500" },
  ];

  const userGroups = [
    { name: "Fitness Buddies", members: 15 },
    { name: "Book Club", members: 8 },
    { name: "Tech Enthusiasts", members: 20 },
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
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-[96%] bg-[#212124] rounded-full flex items-center justify-between border-8 border-black" style={{ borderWidth: '8px', marginTop: '-12px', height: '80px' }}>
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search groups or challenges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-gray-400 placeholder-gray-400 h-20 rounded-full pl-14 pr-6 w-full"
            />
          </div>
          <Button
            onClick={handleCreateGroup}
            className="bg-transparent hover:bg-[#2c2c2f] transition-colors h-20 rounded-full flex items-center justify-center text-gray-400 px-6"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mb-4 mt-12 overflow-x-auto scrollbar-hide">
        <motion.div
          className="flex space-x-2 pl-4"
          drag="x"
          dragConstraints={{ right: 0, left: -((filters.length + userGroups.length - 1) * 150) }}
          onDrag={(e, { point }) => setScrollX(point.x)}
        >
          {filters.map((filter, index) => (
            <FilterButton key={index} name={filter.name} emoji={filter.emoji} color={filter.color} />
          ))}
          <div className="h-8 w-px bg-gray-600 mx-2 self-center"></div>
          {userGroups.map((group, index) => (
            <FilterButton key={`group-${index}`} name={group.name} members={group.members} isGroup={true} />
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
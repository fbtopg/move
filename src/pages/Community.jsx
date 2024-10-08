import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileButton from "../components/ProfileButton";
import FriendActivity from "../components/FriendActivity";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import SwipeableGroupCards from "../components/SwipeableGroupCards";
import { getRandomProfilePicture } from "../utils/profilePictures";
import { activities, myGroups } from "../utils/communityData";

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      setGreeting(
        currentHour >= 5 && currentHour < 12
          ? "Good Morning"
          : currentHour >= 12 && currentHour < 18
          ? "Good Afternoon"
          : "Good Evening"
      );
    };
    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: user.profilePicture,
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  const renderActivitySection = (title, activities) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 mb-6"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 space-grotesk-title">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FriendActivity
              name={activity.name}
              activity={activity.activity}
              type={activity.type}
              profilePicture={activity.profilePicture}
              onUserClick={() => handleUserClick(activity)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground">
      <div className="px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-6"
        >
          <div className="w-full flex justify-end mb-4">
            <ProfileButton />
          </div>
          <h1 className="text-3xl font-bold text-foreground libre-baskerville-bold">{greeting}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 -mx-4"
        >
          <h2 className="text-lg font-semibold mb-4 px-4 space-grotesk-title">My Groups</h2>
          <SwipeableGroupCards groups={myGroups} />
        </motion.div>

        {renderActivitySection("Recent Activity", activities.today)}
        {renderActivitySection("This Month", activities.thisMonth)}
        {renderActivitySection("Earlier", activities.earlier)}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UserProfilePopup
              isOpen={!!selectedUser}
              onClose={() => setSelectedUser(null)}
              user={selectedUser}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SearchPage
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchTerm=""
        setSearchTerm={() => {}}
      />

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
    </div>
  );
};

export default Community;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import SwipeableGroupGrid from "../components/SwipeableGroupGrid";
import { renderActivitySection, fetchPrivateGroups } from "../utils/communityUtils.jsx";
import { activities } from "../utils/communityData";
import { useQuery } from "@tanstack/react-query";
import ProfileButton from "../components/ProfileButton";
import MyGroups from "../components/MyGroups";

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  // TODO: Replace this with actual user data fetching
  const username = "John"; // Placeholder username

  const { data: myGroups = [] } = useQuery({
    queryKey: ['privateGroups'],
    queryFn: fetchPrivateGroups,
  });

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: user.profilePicture,
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  // Sort groups by created_at in descending order (newest first)
  const sortedGroups = [...myGroups].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="min-h-screen bg-[#FEF8F3] dark:bg-gray-900 text-foreground dark:text-white">
      <div className="px-4 pt-4 pb-20">
        <div className="flex justify-end mb-4">
          <ProfileButton />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 spectral-semibold-italic"
        >
          Welcome, {username}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold roboto-medium">My Groups</h2>
          </div>
          <MyGroups onCreateGroup={handleCreateGroup} />
        </motion.div>

        {renderActivitySection("Recent Activity", activities.today, handleUserClick)}
        {renderActivitySection("This Month", activities.thisMonth, handleUserClick)}
        {renderActivitySection("Earlier", activities.earlier, handleUserClick)}
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
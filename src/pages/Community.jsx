import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import ChallengeCard from "../components/ChallengeCard";
import CommunityGroupCard from "../components/CommunityGroupCard";
import { renderActivitySection, fetchPrivateGroups } from "../utils/communityUtils.jsx";
import { activities } from "../utils/communityData";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from '../integrations/supabase/supabase';
import SwipeableSummary from "../components/SwipeableSummary";

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  // TODO: Replace this with actual user data fetching
  const username = "John"; // Placeholder username

  const { data: challenges = [] } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

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

  // Sort groups by created_at in descending order (newest first)
  const sortedGroups = [...myGroups].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const CreateGroupCard = () => (
    <div 
      className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden relative bg-gray-200 dark:bg-gray-700 cursor-pointer flex items-center justify-center"
      onClick={() => setIsCreateGroupModalOpen(true)}
    >
      <Plus className="h-8 w-8 text-gray-600 dark:text-gray-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FEF8F3] dark:bg-gray-900 text-foreground dark:text-white">
      <div className="px-4 pt-4 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6"
        >
          Welcome, {username}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 -mx-4"
        >
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-lg font-semibold roboto-medium">My Groups</h2>
          </div>
          <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
            <CreateGroupCard />
            {sortedGroups.map((group) => (
              <CommunityGroupCard key={group.id} group={{ ...group, isJoined: true }} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <SwipeableSummary />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8 -mx-4"
        >
          <h2 className="text-lg font-semibold mb-4 px-4 roboto-medium">Discover</h2>
          <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
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
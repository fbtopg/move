import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import SwipeableGroupGrid from "../components/SwipeableGroupGrid";
import ProfileButton from "../components/ProfileButton";
import MyGroups from "../components/MyGroups";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import LoginPopup from '../components/LoginPopup';

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { session } = useSupabaseAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      let timeGreeting;
      if (currentHour < 12) {
        timeGreeting = "Good Morning";
      } else if (currentHour < 18) {
        timeGreeting = "Good Afternoon";
      } else {
        timeGreeting = "Good Evening";
      }

      if (session && session.user) {
        const { user_metadata } = session.user;
        const displayName = user_metadata.full_name || user_metadata.name || "User";
        setGreeting(`Welcome, ${displayName}`);
      } else {
        setGreeting(timeGreeting);
      }
    };

    updateGreeting();
    // Update greeting every minute in case the time changes
    const intervalId = setInterval(updateGreeting, 60000);

    return () => clearInterval(intervalId);
  }, [session]);

  const handleCreateGroup = () => {
    if (session) {
      setIsCreateGroupModalOpen(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleLoginRequired = () => {
    setShowLoginPopup(true);
  };

  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8"
    >
      <p className="text-gray-500">No recent activities to display.</p>
    </motion.div>
  );

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
          {greeting}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <MyGroups onCreateGroup={handleCreateGroup} onLoginRequired={handleLoginRequired} />
        </motion.div>

        {session ? renderEmptyState() : (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8 text-gray-500"
          >
            Please log in to view your activities.
          </motion.p>
        )}
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
        onLoginRequired={handleLoginRequired}
      />

      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </div>
  );
};

export default Community;
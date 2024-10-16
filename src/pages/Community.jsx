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
import { Button } from "@/components/ui/button";

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { session } = useSupabaseAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      if (session && session.user) {
        const currentHour = new Date().getHours();
        let timeGreeting;
        if (currentHour < 12) {
          timeGreeting = "Good Morning";
        } else if (currentHour < 18) {
          timeGreeting = "Good Afternoon";
        } else {
          timeGreeting = "Good Evening";
        }
        const { user_metadata } = session.user;
        const displayName = user_metadata.full_name || user_metadata.name || "User";
        setGreeting(`${timeGreeting}, ${displayName}`);
      } else {
        setGreeting("");
      }
    };

    updateGreeting();
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
      <img
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/empty-box.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL2VtcHR5LWJveC5wbmciLCJpYXQiOjE3MjkwODQ0ODQsImV4cCI6MTc2MDYyMDQ4NH0.EmOrpMaQ0WHPjd8Jozwua0fdk7qPRtnE0zU6vTnURUY&t=2024-10-16T13%3A14%3A45.426Z"
        alt="No activities"
        className="mx-auto w-16 h-16 object-contain"
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FEF8F3] dark:bg-gray-900 text-foreground dark:text-white">
      <div className="px-4 pt-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          {greeting && (
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold spectral-semibold-italic"
            >
              {greeting}
            </motion.h1>
          )}
          <ProfileButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <MyGroups onCreateGroup={handleCreateGroup} onLoginRequired={handleLoginRequired} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-base font-semibold roboto-medium mb-4"
        >
          Recent Activity
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          {renderEmptyState()}
        </motion.div>
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
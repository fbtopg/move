import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import MyGroups from "../components/MyGroups";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import LoginPopup from '../components/LoginPopup';
import ProfileButton from "../components/ProfileButton";
import ActivitySection from "../components/ActivitySection";
import ChallengeCardPreview from "../components/ChallengeCardPreview";
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';
import WelcomeContent from '../components/WelcomeContent';

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { session } = useSupabaseAuth();
  const [greeting, setGreeting] = useState("");
  const [userGroups, setUserGroups] = useState([]);

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

  useEffect(() => {
    const fetchUserGroups = async () => {
      if (session && session.user) {
        try {
          const groups = await fetchPrivateGroups(session.user.id);
          setUserGroups(groups);
        } catch (error) {
          console.error('Error fetching user groups:', error);
          setUserGroups([]);
        }
      } else {
        setUserGroups([]);
      }
    };

    fetchUserGroups();
  }, [session]);

  const renderContent = () => {
    if (!session) {
      return (
        <WelcomeContent
          greeting="Welcome"
          onAction={handleLoginRequired}
          actionLabel="Login"
        />
      );
    } else if (userGroups.length === 0) {
      return (
        <WelcomeContent
          greeting={greeting}
          onAction={handleCreateGroup}
          actionLabel="Create Group"
        />
      );
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-8"
        >
          <ChallengeCardPreview />
          <MyGroups onCreateGroup={handleCreateGroup} onLoginRequired={handleLoginRequired} />
          <ActivitySection activities={[]} />
        </motion.div>
      );
    }
  };

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

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground dark:text-white flex flex-col">
      <div className="px-4 pt-4 pb-20 flex-grow flex flex-col">
        {session && (
          <div className="flex justify-end mb-2">
            <ProfileButton />
          </div>
        )}
        {renderContent()}
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

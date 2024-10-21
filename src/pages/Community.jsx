import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import MyGroups from "../components/MyGroups";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import MainHeader from "../components/MainHeader";
import ActivitySection from "../components/ActivitySection";
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';
import WelcomeContent from '../components/WelcomeContent';
import ChallengeCardPreview from '../components/ChallengeCardPreview';
import LoginModal from '../components/LoginModal';

const Community = ({ openLoginModal }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const { session } = useSupabaseAuth();
  const [greeting, setGreeting] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      if (session && session.user) {
        const { user_metadata } = session.user;
        const fullName = user_metadata.full_name || user_metadata.name || "User";
        const firstName = fullName.split(' ')[0];
        setGreeting(`Hi, ${firstName}`);
      } else {
        setGreeting("Welcome guest");
      }
    };

    updateGreeting();
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

  // Placeholder for fetching recent activities
  useEffect(() => {
    // TODO: Implement actual fetching of recent activities
    setRecentActivities([]);
  }, [session]);

  const handleLoginRequired = () => {
    if (typeof openLoginModal === 'function') {
      openLoginModal();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCreateGroup = () => {
    if (session) {
      setIsCreateGroupModalOpen(true);
    } else {
      handleLoginRequired();
    }
  };

  const renderContent = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        {session && userGroups.length > 0 && <ChallengeCardPreview onLoginRequired={handleLoginRequired} />}
        
        {!session && (
          <div className="mt-8">
            <WelcomeContent
              onAction={handleLoginRequired}
              actionLabel="Login"
            />
          </div>
        )}
        {session && userGroups.length === 0 && (
          <div className="mt-8">
            <WelcomeContent
              onAction={handleCreateGroup}
              actionLabel="Create Group"
            />
          </div>
        )}
        {session && userGroups.length > 0 && (
          <div className="mb-10">
            <MyGroups onCreateGroup={handleCreateGroup} onLoginRequired={handleLoginRequired} />
          </div>
        )}
        <div className="space-y-4">
          <ActivitySection activities={recentActivities} />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground dark:text-white flex flex-col">
      <MainHeader openLoginModal={handleLoginRequired} />
      <div className="px-4 pt-4 pb-20 flex-grow flex flex-col overflow-y-auto scrollbar-hide">
        <h1 className="text-2xl font-bold mb-2">
          {greeting}
        </h1>
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

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Community;

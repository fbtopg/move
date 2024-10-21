import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from 'date-fns';
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import MyGroups from "../components/MyGroups";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import ProfileButton from "../components/ProfileButton";
import ActivitySection from "../components/ActivitySection";
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';
import WelcomeContent from '../components/WelcomeContent';
import ChallengeCardPreview from '../components/ChallengeCardPreview';
import LoginModal from '../components/LoginModal';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    setIsLoginModalOpen(true);
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
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        {session && userGroups.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <ChallengeCardPreview onLoginRequired={handleLoginRequired} />
            </CardContent>
          </Card>
        )}
        
        {!session && (
          <Card>
            <CardContent className="p-4">
              <WelcomeContent
                onAction={handleLoginRequired}
                actionLabel="Login"
              />
            </CardContent>
          </Card>
        )}
        {session && userGroups.length === 0 && (
          <Card>
            <CardContent className="p-4">
              <WelcomeContent
                onAction={handleCreateGroup}
                actionLabel="Create Group"
              />
            </CardContent>
          </Card>
        )}
        {session && userGroups.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <MyGroups onCreateGroup={handleCreateGroup} onLoginRequired={handleLoginRequired} />
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent className="p-4">
            <ActivitySection activities={recentActivities} />
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground dark:text-white flex flex-col">
      <div className="px-4 pt-6 pb-20 flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">
            {greeting}
          </h1>
          <p className="text-sm text-gray-500">
            {format(new Date(), 'EEEE, MMMM do')}
          </p>
        </motion.div>
        <Separator className="mb-6" />
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
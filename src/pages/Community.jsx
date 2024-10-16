import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import MyGroups from "../components/MyGroups";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import LoginPopup from '../components/LoginPopup';
import ProfileButton from "../components/ProfileButton";
import { Plus } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#FBFCFC] dark:bg-gray-900 text-foreground dark:text-white flex flex-col">
      <div className="px-4 pt-4 pb-20 flex-grow flex flex-col">
        {session ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex-grow">
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
              </div>
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center justify-center flex-grow"
          >
            <img
              src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/illustration2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2lsbHVzdHJhdGlvbjIucG5nIiwiaWF0IjoxNzI5MDg5MTAzLCJleHAiOjE3NjA2MjUxMDN9.jnvRMKmghK9GY5JX-3tBuEkW0zUV__A4JEA_hLN0ikM&t=2024-10-16T14%3A31%3A44.880Z"
              alt="Welcome illustration"
              className="w-48 h-48 object-contain mb-4"
            />
            <p className="text-lg font-bold text-center mb-2">
              Create groups and invite friends
            </p>
            <p className="text-sm font-light text-center mb-6">
              Connect, share, challenge, and more
            </p>
            <button
              className="w-12 h-12 bg-blue-500 rounded-[35%] shadow-lg flex items-center justify-center"
              onClick={handleLoginRequired}
            >
              <Plus className="text-white" size={24} />
            </button>
          </motion.div>
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
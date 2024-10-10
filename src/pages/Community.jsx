import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import CommunityHeader from "../components/CommunityHeader";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import SwipeableGroupCards from "../components/SwipeableGroupCards";
import ChallengeCard from "../components/ChallengeCard";
import { renderActivitySection, getGreeting, fetchPrivateGroups } from "../utils/communityUtils.jsx";
import { activities } from "../utils/communityData";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from '../integrations/supabase/supabase';

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel({ 
    dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    align: "start",
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 }
    },
    speed: 10,
    threshold: 20,
    skipSnaps: true
  });

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

  useEffect(() => {
    const updateGreeting = () => setGreeting(getGreeting());
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground">
      <CommunityHeader />
      <div className="px-4 pt-1 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground libre-baskerville-bold">{greeting}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 -mx-4"
        >
          <h2 className="text-lg font-semibold mb-4 px-4 roboto-medium">Discover</h2>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="flex-[0_0_45%] min-w-0 pl-4">
                  <ChallengeCard challenge={challenge} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8 -mx-4"
        >
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-lg font-semibold roboto-medium">My Groups</h2>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 h-auto w-auto"
              onClick={() => setIsCreateGroupModalOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <SwipeableGroupCards groups={myGroups.map(group => ({ ...group, isJoined: true }))} />
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
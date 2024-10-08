import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommunityHeader from "../components/CommunityHeader";
import FriendActivity from "../components/FriendActivity";
import UserProfilePopup from "../components/UserProfilePopup";
import SearchPage from "../components/SearchPage";
import CreateGroupModal from "../components/CreateGroupModal";
import SwipeableGroupCards from "../components/SwipeableGroupCards";
import { getRandomProfilePicture } from "../utils/profilePictures";
import { renderActivitySection, getGreeting } from "../utils/communityUtils.jsx";

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

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

  const myGroups = [
    {
      id: 1,
      name: "Morning chill",
      members: 5,
      image:
        "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMC5qcGciLCJpYXQiOjE3MjgxOTMwOTgsImV4cCI6MTc1OTcyOTA5OH0.TIDMfZ1HBhzfg-7VKPufXLE41_I-Jlsm6WMtyDFPOlk&t=2024-10-06T05%3A38%3A18.966Z",
      hasActivity: true,
      lastActivity: "Just now",
      memberProfiles: [
        getRandomProfilePicture(),
        getRandomProfilePicture(),
        getRandomProfilePicture(),
      ],
      description: "A group for morning activities and relaxation.",
    },
    {
      id: 2,
      name: "Climbing bros",
      members: 8,
      image:
        "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_01.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMS5qcGciLCJpYXQiOjE3MjgxOTMwNzYsImV4cCI6MTc1OTcyOTA3Nn0.SnPjAPmZmpKMWm5FPCduJ-eQycFeRmaIgNIazjXSsyE&t=2024-10-06T05%3A37%3A57.333Z",
      hasActivity: true,
      lastActivity: "5m ago",
      memberProfiles: [
        getRandomProfilePicture(),
        getRandomProfilePicture(),
        getRandomProfilePicture(),
      ],
      description: "For climbing enthusiasts and adventurers.",
    },
    {
      id: 3,
      name: "Trip",
      members: 3,
      image:
        "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_02.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMi5qcGciLCJpYXQiOjE3MjgxOTMwOTAsImV4cCI6MTc1OTcyOTA5MH0.KrJjSiUbjbCTdk5oyKozzdkrtb2ZpQkLcLcPXdIIBT8&t=2024-10-06T05%3A38%3A11.060Z",
      hasActivity: true,
      lastActivity: "2h ago",
      memberProfiles: [
        getRandomProfilePicture(),
        getRandomProfilePicture(),
        getRandomProfilePicture(),
      ],
      description: "Plan and share your travel experiences.",
    },
  ];

  const activities = {
    today: [
      {
        name: "Emma",
        activity:
          "finished walking 1km and completed daily walk. • just now",
        type: "walk",
        profilePicture: getRandomProfilePicture(),
      },
      {
        name: "John",
        activity:
          "solved quiz #089 and completed daily quiz. • just now",
        type: "quiz",
        profilePicture: getRandomProfilePicture(),
      },
      {
        name: "Sarah",
        activity:
          "finished walking 1km and completed daily walk. • just now",
        type: "walk",
        profilePicture: getRandomProfilePicture(),
      },
    ],
    thisMonth: [
      {
        name: "Geonu",
        activity:
          "finished walking 1km and completed daily walk. • 2d",
        type: "walk",
        profilePicture: getRandomProfilePicture(),
      },
      {
        name: "Astrid",
        activity:
          "finished walking 1km and completed daily walk. • 5d",
        type: "walk",
        profilePicture: getRandomProfilePicture(),
      },
      {
        name: "Fitra",
        activity:
          "solved quiz #089 and completed daily quiz. • 1w",
        type: "quiz",
        profilePicture: getRandomProfilePicture(),
      },
    ],
    earlier: [
      {
        name: "Rissa",
        activity:
          "solved quiz #089 and completed daily quiz. • 2w",
        type: "quiz",
        profilePicture: getRandomProfilePicture(),
      },
      {
        name: "John",
        activity:
          "finished walking 1km and completed daily walk. • 3w",
        type: "walk",
        profilePicture: getRandomProfilePicture(),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground">
      <div className="px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-6"
        >
          <CommunityHeader />
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

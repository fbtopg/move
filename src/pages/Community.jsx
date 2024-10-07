import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FriendActivity from '../components/FriendActivity';
import UserProfilePopup from '../components/UserProfilePopup';
import SearchPage from '../components/SearchPage';
import CreateGroupModal from '../components/CreateGroupModal';
import SwipeableGroupCards from '../components/SwipeableGroupCards';
import { getRandomProfilePicture } from '../utils/profilePictures';

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      setGreeting(currentHour >= 5 && currentHour < 12 ? 'Good Morning' : 
                  currentHour >= 12 && currentHour < 18 ? 'Good Afternoon' : 'Good Evening');
    };
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
    { id: 1, name: 'Morning chill', members: 5, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMC5qcGciLCJpYXQiOjE3MjgxOTMwOTgsImV4cCI6MTc1OTcyOTA5OH0.TIDMfZ1HBhzfg-7VKPufXLE41_I-Jlsm6WMtyDFPOlk&t=2024-10-06T05%3A38%3A18.966Z', hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'A group for morning activities and relaxation.' },
    { id: 2, name: 'Climbing bros', members: 8, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_01.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMS5qcGciLCJpYXQiOjE3MjgxOTMwNzYsImV4cCI6MTc1OTcyOTA3Nn0.SnPjAPmZmpKMWm5FPCduJ-eQycFeRmaIgNIazjXSsyE&t=2024-10-06T05%3A37%3A57.333Z', hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'For climbing enthusiasts and adventurers.' },
    { id: 3, name: 'Trip', members: 3, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_02.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMi5qcGciLCJpYXQiOjE3MjgxOTMwOTAsImV4cCI6MTc1OTcyOTA5MH0.KrJjSiUbjbCTdk5oyKozzdkrtb2ZpQkLcLcPXdIIBT8&t=2024-10-06T05%3A38%3A11.060Z', hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'Plan and share your travel experiences.' },
  ];

  const activities = {
    today: [
      { name: "Emma", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
      { name: "John", activity: "solved quiz #089 and completed daily quiz. • just now", type: "quiz", profilePicture: getRandomProfilePicture() },
      { name: "Sarah", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
    ],
    thisMonth: [
      { name: "Geonu", activity: "finished walking 1km and completed daily walk. • 2d", type: "walk", profilePicture: getRandomProfilePicture() },
      { name: "Astrid", activity: "finished walking 1km and completed daily walk. • 5d", type: "walk", profilePicture: getRandomProfilePicture() },
      { name: "Fitra", activity: "solved quiz #089 and completed daily quiz. • 1w", type: "quiz", profilePicture: getRandomProfilePicture() },
    ],
    earlier: [
      { name: "Rissa", activity: "solved quiz #089 and completed daily quiz. • 2w", type: "quiz", profilePicture: getRandomProfilePicture() },
      { name: "John", activity: "finished walking 1km and completed daily walk. • 3w", type: "walk", profilePicture: getRandomProfilePicture() },
    ],
  };

  const renderActivitySection = (title, activities) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 mb-6"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 space-grotesk-title">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FriendActivity
              name={activity.name}
              activity={activity.activity}
              type={activity.type}
              profilePicture={activity.profilePicture}
              onUserClick={() => handleUserClick(activity)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground">
      <div className="px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-6"
        >
          <div className="w-full flex justify-end mb-4">
            <Button
              onClick={() => navigate('/profile')}
              className="bg-white hover:bg-gray-100 transition-colors h-10 w-10 rounded-full flex items-center justify-center shadow-md"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z" alt="Profile" />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground libre-baskerville-bold">{greeting}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 -mx-4"
        >
          <h2 className="text-xl font-semibold mb-4 px-4 space-grotesk-title">My Groups</h2>
          <SwipeableGroupCards groups={myGroups} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {renderActivitySection("Recent Activity", activities.today)}
          {renderActivitySection("This Month", activities.thisMonth)}
          {renderActivitySection("Earlier", activities.earlier)}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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

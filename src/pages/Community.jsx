import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus, Users, Trophy } from 'lucide-react';
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

  const WalkChallengeBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-blue-500 text-white p-4 mb-6 shadow-md w-screen -mx-4"
    >
      <h2 className="text-xl font-bold text-center">Daily Walk Challenge</h2>
      <p className="text-center">Walk 10,000 steps every day for 30 days</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground">
      <div className="px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 -mx-4"
        >
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2 px-4">
            <Button
              onClick={() => setIsCreateGroupModalOpen(true)}
              className="flex-shrink-0 bg-[#3B72EC] text-white hover:bg-[#3B72EC]/90 transition-colors px-6 py-3 rounded-full flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Group</span>
            </Button>
            <Button
              onClick={() => navigate('/group', { state: { activeTab: 'myGroup' } })}
              className="flex-shrink-0 bg-white text-[#3B72EC] hover:bg-gray-100 transition-colors px-6 py-3 rounded-full flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>My Groups</span>
            </Button>
            <Button
              onClick={() => navigate('/board')}
              className="flex-shrink-0 bg-white text-[#3B72EC] hover:bg-gray-100 transition-colors px-6 py-3 rounded-full flex items-center space-x-2"
            >
              <Trophy className="w-5 h-5" />
              <span>Challenges</span>
            </Button>
          </div>
        </motion.div>

        <WalkChallengeBanner />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 -mx-4"
        >
          <h2 className="text-xl font-semibold mb-4 px-4">My Groups</h2>
          <SwipeableGroupCards groups={myGroups} />
        </motion.div>

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
    </div>
  );
};

export default Community;

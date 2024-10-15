import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import CommunityHeader from '../components/CommunityHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap } from 'lucide-react';
import CommunityPost from '../components/CommunityPost';
import UserProfilePopup from '../components/UserProfilePopup';
import { getRandomProfilePicture } from '../utils/profilePictures';

const Community = ({ onUserClick }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: getRandomProfilePicture(),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  const posts = [
    {
      id: 1,
      user: { name: 'Alice', avatar: getRandomProfilePicture() },
      content: 'Just completed my daily walk challenge! 🚶‍♀️💪 #StayActive',
      likes: 15,
      comments: 3,
      timestamp: '2h ago',
    },
    {
      id: 2,
      user: { name: 'Bob', avatar: getRandomProfilePicture() },
      content: "Quiz time! Who's up for a brain teaser? 🧠🤔 #DailyQuiz",
      likes: 8,
      comments: 5,
      timestamp: '3h ago',
    },
    {
      id: 3,
      user: { name: 'Charlie', avatar: getRandomProfilePicture() },
      content: 'New personal best on my walk today! 🏃‍♂️🎉 #FitnessGoals',
      likes: 20,
      comments: 7,
      timestamp: '5h ago',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEF8F3] flex flex-col">
      <CommunityHeader />
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CommunityPost post={post} onUserClick={() => handleUserClick(post.user)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <BottomNavBar activeTab="community" />
      {selectedUser && (
        <UserProfilePopup
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Community;
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import CreateGroupModal from '../components/CreateGroupModal';
import CommunityGroupCard from '../components/CommunityGroupCard';
import { getRandomProfilePicture } from '../utils/profilePictures';

const Group = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  const discoverGroups = [
    { id: 1, name: 'Fitness Enthusiasts', description: 'Join us for daily workouts, nutrition tips, and fitness challenges. Let\'s achieve our health goals together!', members: 150, image: 'https://example.com/fitness.jpg', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 2, name: 'Book Club', description: 'Dive into captivating stories, share your thoughts, and discover new literary worlds with fellow book lovers.', members: 75, image: 'https://example.com/books.jpg', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 3, name: 'Tech Innovators', description: 'Explore cutting-edge technologies, share your projects, and collaborate on innovative ideas with tech enthusiasts.', members: 200, image: 'https://example.com/tech.jpg', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
  ];

  const myGroups = [
    { id: 1, name: 'Morning chill', members: 5, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66fa054c&is=66f8b3cc&hm=e90d37ad3b96dd8bd0e80febba1744f732f4fb0f6e23e9c2b4502f49f446e25b&', hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'A group for morning activities and relaxation.' },
    { id: 2, name: 'Climbing bros', members: 8, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66fa054c&is=66f8b3cc&hm=f08aa4c188ead47c135fa4806063a3d91464afec7975387ce7f541ba100e842a&', hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'For climbing enthusiasts and adventurers.' },
    { id: 3, name: 'Trip', members: 3, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66fa054d&is=66f8b3cd&hm=c87306c053f5fee8f50fd4acc6363526eba0e50b6547667fd683092e4e032cdc&', hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'Plan and share your travel experiences.' },
  ];

  return (
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
      <div className="sticky top-0 z-10 bg-[#FEF8F3] px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Groups</h1>
          <Button
            onClick={handleCreateGroup}
            className="bg-[#3B72EC] hover:bg-[#3B72EC]/90 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Input
            className="w-full bg-white border-none text-gray-900 placeholder-gray-500 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B72EC] focus:border-transparent"
            placeholder="Search groups"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="flex mb-4">
          <Button
            className={`mr-2 ${activeTab === 'discover' ? 'bg-[#3B72EC] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </Button>
          <Button
            className={`${activeTab === 'myGroup' ? 'bg-[#3B72EC] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('myGroup')}
          >
            My Groups
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pb-20 px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'discover' ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {discoverGroups.map((group, index) => (
                <CommunityGroupCard key={group.id} group={group} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="myGroup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {myGroups.map((group, index) => (
                <CommunityGroupCard key={group.id} group={group} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNavBar activeTab="group" />
      
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
    </div>
  );
};

export default Group;

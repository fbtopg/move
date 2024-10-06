import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateGroupModal from '../components/CreateGroupModal';

const GroupCard = ({ group, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-4 mb-4 cursor-pointer"
  >
    <div className="flex items-center mb-2">
      <Avatar className="h-12 w-12 mr-3 border-2 border-blue-400">
        <AvatarImage src={group.image} alt={group.name} />
        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold text-white">{group.name}</h3>
        <p className="text-sm text-gray-300">{group.members} members</p>
      </div>
    </div>
    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{group.description}</p>
    <div className="flex justify-between items-center">
      <div className="flex -space-x-2">
        {group.memberAvatars.map((avatar, index) => (
          <Avatar key={index} className="h-6 w-6 border border-gray-800">
            <AvatarImage src={avatar} />
            <AvatarFallback>{index + 1}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
        {group.isJoined ? 'Joined' : 'Join'}
      </Button>
    </div>
  </motion.div>
);

const Group = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  // Enhanced group data with more details and member avatars
  const discoverGroups = [
    { id: 1, name: 'Fitness Enthusiasts', description: 'Join us for daily workouts, nutrition tips, and fitness challenges. Let's achieve our health goals together!', members: 150, image: 'https://example.com/fitness.jpg', memberAvatars: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2', 'https://i.pravatar.cc/150?img=3'] },
    { id: 2, name: 'Book Club', description: 'Dive into captivating stories, share your thoughts, and discover new literary worlds with fellow book lovers.', members: 75, image: 'https://example.com/books.jpg', memberAvatars: ['https://i.pravatar.cc/150?img=4', 'https://i.pravatar.cc/150?img=5', 'https://i.pravatar.cc/150?img=6'] },
    { id: 3, name: 'Tech Innovators', description: 'Explore cutting-edge technologies, share your projects, and collaborate on innovative ideas with tech enthusiasts.', members: 200, image: 'https://example.com/tech.jpg', memberAvatars: ['https://i.pravatar.cc/150?img=7', 'https://i.pravatar.cc/150?img=8', 'https://i.pravatar.cc/150?img=9'] },
  ];

  const myGroups = [
    { id: 4, name: 'My Fitness Journey', description: 'Track our personal fitness progress, share workout routines, and motivate each other to reach new heights.', members: 10, image: 'https://example.com/my-fitness.jpg', memberAvatars: ['https://i.pravatar.cc/150?img=10', 'https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=12'], isJoined: true },
    { id: 5, name: 'Local Book Club', description: 'Discuss our current read, vote on the next book, and organize local meetups for literary discussions.', members: 15, image: 'https://example.com/local-books.jpg', memberAvatars: ['https://i.pravatar.cc/150?img=13', 'https://i.pravatar.cc/150?img=14', 'https://i.pravatar.cc/150?img=15'], isJoined: true },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="sticky top-0 z-10 bg-gray-900 px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Groups</h1>
          <Button
            onClick={handleCreateGroup}
            className="bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Input
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search groups"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="flex mb-4">
          <Button
            className={`mr-2 ${activeTab === 'discover' ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </Button>
          <Button
            className={`${activeTab === 'myGroup' ? 'bg-blue-500' : 'bg-gray-700'}`}
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
            >
              {discoverGroups.map(group => (
                <GroupCard key={group.id} group={group} onClick={() => navigate(`/group/${group.id}`)} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="myGroup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {myGroups.map(group => (
                <GroupCard key={group.id} group={group} onClick={() => navigate(`/group/${group.id}`)} />
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
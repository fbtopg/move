import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import CreateGroupModal from '../components/CreateGroupModal';
import CommunityGroupCard from '../components/CommunityGroupCard';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { useLocation } from 'react-router-dom';

const Group = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('discover');
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }

    // Add meta tag to prevent zooming
    const metaTag = document.createElement('meta');
    metaTag.name = 'viewport';
    metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    document.head.appendChild(metaTag);

    // Remove meta tag when component unmounts
    return () => {
      document.head.removeChild(metaTag);
    };
  }, [location]);

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  const myGroups = [
    { id: 1, name: 'Morning chill', members: 5, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMC5qcGciLCJpYXQiOjE3MjgxOTMwOTgsImV4cCI6MTc1OTcyOTA5OH0.TIDMfZ1HBhzfg-7VKPufXLE41_I-Jlsm6WMtyDFPOlk&t=2024-10-06T05%3A38%3A18.966Z', hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'A group for morning activities and relaxation.', isOwner: true },
    { id: 2, name: 'Climbing bros', members: 8, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_01.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMS5qcGciLCJpYXQiOjE3MjgxOTMwNzYsImV4cCI6MTc1OTcyOTA3Nn0.SnPjAPmZmpKMWm5FPCduJ-eQycFeRmaIgNIazjXSsyE&t=2024-10-06T05%3A37%3A57.333Z', hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'For climbing enthusiasts and adventurers.', isOwner: false },
    { id: 3, name: 'Trip', members: 3, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_02.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMi5qcGciLCJpYXQiOjE3MjgxOTMwOTAsImV4cCI6MTc1OTcyOTA5MH0.KrJjSiUbjbCTdk5oyKozzdkrtb2ZpQkLcLcPXdIIBT8&t=2024-10-06T05%3A38%3A11.060Z', hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'Plan and share your travel experiences.', isOwner: true },
  ];

  const discoverGroups = [
    { 
      id: 4, 
      name: 'Fitness Enthusiasts', 
      description: 'Join us for daily workouts, nutrition tips, and fitness challenges. Let\'s achieve our health goals together!', 
      members: 150, 
      image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/andrealaureati_anime_style_illustration_of_landscape_with_petun_0054dceb-c7d7-4664-87c0-d82dbf362529%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvYW5kcmVhbGF1cmVhdGlfYW5pbWVfc3R5bGVfaWxsdXN0cmF0aW9uX29mX2xhbmRzY2FwZV93aXRoX3BldHVuXzAwNTRkY2ViLWM3ZDctNDY2NC04N2MwLWQ4MmRiZjM2MjUyOSAxLnBuZyIsImlhdCI6MTcyODE5OTk5MywiZXhwIjoxNzU5NzM1OTkzfQ.iyYf_zneUEnJKV_EELBpgE4woCebOzaAoHKwnGkiXvU&t=2024-10-06T07%3A33%3A14.727Z', 
      memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
      isOwner: false 
    },
    { 
      id: 5, 
      name: 'Book Club', 
      description: 'Dive into captivating stories, share your thoughts, and discover new literary worlds with fellow book lovers.', 
      members: 75, 
      image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/mgmattractingwealth_fileCUsersHPDownloadsScreenshot2046.png_A_c_62b30d39-e139-44e7-aa5c-3a074a2588de%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvbWdtYXR0cmFjdGluZ3dlYWx0aF9maWxlQ1VzZXJzSFBEb3dubG9hZHNTY3JlZW5zaG90MjA0Ni5wbmdfQV9jXzYyYjMwZDM5LWUxMzktNDRlNy1hYTVjLTNhMDc0YTI1ODhkZSAxLnBuZyIsImlhdCI6MTcyODIwMDAyMCwiZXhwIjoxNzU5NzM2MDIwfQ.qcGtNMQVOz_G3I67gm8x--EAKdpR5bGKMD9UxFWZdyc&t=2024-10-06T07%3A33%3A41.601Z', 
      memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
      isOwner: false 
    },
    { 
      id: 6, 
      name: 'Tech Innovators', 
      description: 'Explore cutting-edge technologies, share your projects, and collaborate on innovative ideas with tech enthusiasts.', 
      members: 200, 
      image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/mgmattractingwealth_fileCUsersHPDownloadsScreenshot2046.png_A_c_62b30d39-e139-44e7-aa5c-3a074a2588de%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvbWdtYXR0cmFjdGluZ3dlYWx0aF9maWxlQ1VzZXJzSFBEb3dubG9hZHNTY3JlZW5zaG90MjA0Ni5wbmdfQV9jXzYyYjMwZDM5LWUxMzktNDRlNy1hYTVjLTNhMDc0YTI1ODhkZSAxLnBuZyIsImlhdCI6MTcyODIwMDAyMCwiZXhwIjoxNzU5NzM2MDIwfQ.qcGtNMQVOz_G3I67gm8x--EAKdpR5bGKMD9UxFWZdyc&t=2024-10-06T07%3A33%3A41.601Z', 
      memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
      isOwner: false 
    },
  ].map(group => ({ ...group, isJoined: false }));

  const renderGroups = (groups) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {groups.map((group, index) => (
        <CommunityGroupCard key={group.id} group={group} index={index} />
      ))}
    </motion.div>
  );

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
          {activeTab === 'discover' ? renderGroups(discoverGroups) : renderGroups(myGroups)}
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
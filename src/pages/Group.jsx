import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavBar from '../components/BottomNavBar';
import GroupButton from '../components/GroupButton';

const Group = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  const groups = [
    { name: 'Fitness Buddies', members: 120 },
    { name: 'Book Club', members: 45 },
    { name: 'Tech Enthusiasts', members: 78 },
    { name: 'Foodies Unite', members: 92 },
    { name: 'Travel Explorers', members: 63 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Groups</h1>
          
          <div className="relative mb-6">
            <div className="relative">
              <Input
                className="w-full bg-gray-800 border-gray-700 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search groups or users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <Button
            onClick={handleCreateGroup}
            className="w-full bg-[#212124] text-white hover:bg-[#2c2c2f] transition-colors h-20 rounded-full flex items-center justify-center mb-4 border-2 border-gray-600"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Group
          </Button>

          <div className="flex overflow-x-auto space-x-2 pb-4 scrollbar-hide">
            {groups.map((group, index) => (
              <GroupButton key={index} name={group.name} members={group.members} />
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Group;

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavBar from '../components/BottomNavBar';

const Group = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  const myGroups = [
    { id: 1, name: 'My group 1', members: 5 },
    { id: 2, name: 'My group 2', members: 8 },
    { id: 3, name: 'My group 3', members: 3 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Groups</h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-2 py-2 bg-transparent border-b border-gray-700 text-white w-full focus:outline-none focus:border-white transition-colors rounded-none"
              placeholder="Search groups or users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={handleCreateGroup}
            className="w-full bg-[#212124] text-white hover:bg-[#2c2c2f] transition-colors h-20 rounded-lg flex items-center justify-center mb-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Group
          </Button>

          <div className="space-y-4">
            {myGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between bg-[#212124] p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-400">{group.members} members</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Group;

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavBar from '../components/BottomNavBar';
import PopularGroupCard from '../components/PopularGroupCard';

const Group = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  const myGroups = [
    { id: 1, name: 'My group 1', members: 5, lastActivity: 5 },
    { id: 2, name: 'My group 2', members: 8, lastActivity: 15 },
    { id: 3, name: 'My group 3', members: 3, lastActivity: 30 },
  ];

  const popularGroups = [
    { id: 1, name: 'Fitness Enthusiasts', members: 1200, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z' },
    { id: 2, name: 'Book Club', members: 800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319182.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgyLnBuZyIsImlhdCI6MTcyNzIzNTcwOCwiZXhwIjoxNzU4NzcxNzA4fQ.EvAjjxeX3ab_wRmddaL647-NnNcSBOxguMPsLS6md3Q&t=2024-09-25T03%3A41%3A48.733Z' },
    { id: 3, name: 'Tech Innovators', members: 1500, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z' },
    { id: 4, name: 'Foodies United', members: 2000, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319182.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgyLnBuZyIsImlhdCI6MTcyNzIzNTcwOCwiZXhwIjoxNzU4NzcxNzA4fQ.EvAjjxeX3ab_wRmddaL647-NnNcSBOxguMPsLS6md3Q&t=2024-09-25T03%3A41%3A48.733Z' },
    { id: 5, name: 'Travel Adventurers', members: 1800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z' },
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

          <div className="relative -mt-4 mb-6">
            <Button
              onClick={handleCreateGroup}
              className="w-full bg-[#212124] text-white hover:bg-[#2c2c2f] transition-colors h-22 rounded-full flex items-center justify-center absolute -top-8"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Group
            </Button>
          </div>

          <div className="space-y-4 mb-8 mt-16">
            <h2 className="text-xl font-semibold mb-2">My Groups</h2>
            {myGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between bg-[#212124] p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-400">{group.members} members</p>
                  <p className="text-xs text-gray-500">Last activity: {group.lastActivity} minutes ago</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Popular</h2>
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4">
              {popularGroups.map((group) => (
                <PopularGroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Group;

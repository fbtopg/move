import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import CreateGroupModal from '../components/CreateGroupModal';

const Group = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    setIsCreateGroupOpen(true);
  };

  // Sample group data (replace with actual data fetching logic)
  const discoverGroups = [
    { id: 1, name: 'Fitness Enthusiasts', description: 'A group for fitness lovers', members: 150, image: 'https://example.com/fitness.jpg' },
    { id: 2, name: 'Book Club', description: 'Discuss your favorite books', members: 75, image: 'https://example.com/books.jpg' },
    { id: 3, name: 'Tech Innovators', description: 'For tech enthusiasts and innovators', members: 200, image: 'https://example.com/tech.jpg' },
  ];

  // Sample user's groups (replace with actual user's groups data)
  const myGroups = [
    { id: 4, name: 'My Fitness Group', description: 'Personal fitness journey', members: 10, image: 'https://example.com/my-fitness.jpg' },
    { id: 5, name: 'Local Book Club', description: 'Our neighborhood book discussions', members: 15, image: 'https://example.com/local-books.jpg' },
  ];

  return (
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
      <div className="sticky top-0 z-10 bg-[#FEF8F3] px-4 py-2">
        {/* Title and Create Group button */}
        <div className="flex justify-between items-center">
          <div className="w-6"></div>
          <h1 className="text-lg font-semibold text-center flex-grow">Group</h1>
          <Button
            onClick={handleCreateGroup}
            className="p-0 bg-transparent hover:bg-transparent"
          >
            <img
              src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/add-group.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2FkZC1ncm91cC5wbmciLCJpYXQiOjE3MjgwMDg0NTQsImV4cCI6MTc1OTU0NDQ1NH0.60sDT6jS_yDXTsWSTYM6RpaNqtw9xyoNI9AOQG24EBw&t=2024-10-04T02%3A20%3A53.816Z"
              alt="Create Group"
              className="w-5 h-5"
            />
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-300">
            <button
              className={`pb-2 px-4 ${activeTab === 'discover' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
            <button
              className={`pb-2 px-4 ${activeTab === 'myGroup' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('myGroup')}
            >
              My Group
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Input
              className="w-full bg-white border-none text-gray-900 placeholder-gray-500 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search groups or users"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Content area */}
          <div className="space-y-4">
            {activeTab === 'discover' ? (
              discoverGroups.map(group => <GroupCard key={group.id} group={group} />)
            ) : (
              myGroups.map(group => <GroupCard key={group.id} group={group} />)
            )}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab="group" />
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
      />
    </div>
  );
};

export default Group;
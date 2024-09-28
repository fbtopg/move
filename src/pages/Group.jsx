import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import GroupCard from '../components/GroupCard';
import { Button } from "@/components/ui/button";
import FriendActivity from '../components/FriendActivity';
import { useNavigate } from 'react-router-dom';

const Group = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const myGroups = [
    { id: 1, name: 'My group 1', members: 5, gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)', hasActivity: true },
    { id: 2, name: 'My group 2', members: 8, gradient: 'linear-gradient(135deg, #FFD93D, #6A5ACD)', hasActivity: true },
    { id: 3, name: 'My group 3', members: 3, gradient: 'linear-gradient(135deg, #FF8C00, #40E0D0)', hasActivity: true },
  ];

  const popularGroups = [
    { id: 1, name: 'Fitness Enthusiasts', members: 1200, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z' },
    { id: 2, name: 'Book Club', members: 800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319182.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgyLnBuZyIsImlhdCI6MTcyNzIzNTcwOCwiZXhwIjoxNzU4NzcxNzA4fQ.EvAjjxeX3ab_wRmddaL647-NnNcSBOxguMPsLS6md3Q&t=2024-09-25T03%3A41%3A48.733Z' },
    { id: 3, name: 'Tech Innovators', members: 1500, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z' },
    { id: 4, name: 'Foodies United', members: 2000, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319182.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgyLnBuZyIsImlhdCI6MTcyNzIzNTcwOCwiZXhwIjoxNzU4NzcxNzA4fQ.EvAjjxeX3ab_wRmddaL647-NnNcSBOxguMPsLS6md3Q&t=2024-09-25T03%3A41%3A48.733Z' },
    { id: 5, name: 'Travel Adventurers', members: 1800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z' },
  ];

  const recentActivities = [
    { name: "Emma", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTEucG5nIiwiaWF0IjoxNzI1NzE3Mjg1LCJleHAiOjE3NTcyNTMyODV9.qVjtzjCu_bW-iEyzul3BjNeCwoMS6prEcNFETCCBzrs&t=2024-09-07T13%3A54%3A44.233Z" },
    { name: "John", activity: "solved quiz #089 and completed daily quiz. • just now", type: "quiz", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTIucG5nIiwiaWF0IjoxNzI1NzE3Mjk1LCJleHAiOjE3NTcyNTMyOTV9.ZggcfcQRRTSdDHtyXr8Opujx6iGlBEISYrW-scvSMik&t=2024-09-07T13%3A54%3A54.988Z" },
    { name: "Sarah", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTMucG5nIiwiaWF0IjoxNzI1NzE3MzExLCJleHAiOjE3NTcyNTMzMTF9.ghhBkpc92hU749PoU_fV_q0HSHBg4SZw8FVeNDsa8J0&t=2024-09-07T13%3A55%3A10.841Z" },
  ];

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  const handleViewMore = (section) => {
    if (section === 'My Groups') {
      navigate('/my-groups');
    } else {
      console.log(`View more clicked for ${section}`);
      // Implement view more logic for other sections here
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4">
          <div className="relative mb-6">
            <div className="relative">
              <Input
                className="w-full bg-[#1c1c1f] border-none text-gray-400 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search groups or users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-gray-200">My Groups</h2>
              <button
                className="text-[#3C82F6] text-xs font-semibold opacity-60"
                onClick={() => navigate('/my-groups')}
              >
                View ({myGroups.length}) &gt;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GroupCard
                group={{ name: 'New group', members: 0 }}
                onClick={() => console.log("Create group clicked")}
                isNewGroup={true}
              />
              {myGroups.slice(0, 3).map((group) => (
                <GroupCard key={group.id} group={group} hasActivity={group.hasActivity} gradient={group.gradient} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-200">Recent Activity</h2>
              <button
                className="text-[#3C82F6] text-xs font-semibold opacity-60"
                onClick={() => handleViewMore('Recent Activity')}
              >
                View &gt;
              </button>
            </div>
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <div key={index} className="bg-[#161618] rounded-lg p-2">
                  <FriendActivity
                    name={activity.name}
                    activity={activity.activity}
                    type={activity.type}
                    profilePicture={activity.profilePicture}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-200">Popular</h2>
              <button
                className="text-[#3C82F6] text-xs font-semibold opacity-60"
                onClick={() => handleViewMore('Popular')}
              >
                View &gt;
              </button>
            </div>
            <div className="flex overflow-x-auto space-x-4 -mx-4 px-4">
              {popularGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
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
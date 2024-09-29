import React, { useState, useRef } from 'react';
import { Search, Plus, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import GroupCard from '../components/GroupCard';
import { Button } from "@/components/ui/button";
import FriendActivity from '../components/FriendActivity';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRandomProfilePicture } from '../utils/profilePictures';

const Group = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const popularGroupsRef = useRef(null);
  const myGroupsRef = useRef(null);

  const truncateName = (name) => {
    return name.length > 14 ? name.slice(0, 14) + '...' : name;
  };

  const myGroups = [
    { id: 1, name: truncateName('Morning chill'), members: 5, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66fa054c&is=66f8b3cc&hm=e90d37ad3b96dd8bd0e80febba1744f732f4fb0f6e23e9c2b4502f49f446e25b&', hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 2, name: truncateName('Climbing bros'), members: 8, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66fa054c&is=66f8b3cc&hm=f08aa4c188ead47c135fa4806063a3d91464afec7975387ce7f541ba100e842a&', hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 3, name: truncateName('Trip'), members: 3, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66fa054d&is=66f8b3cd&hm=c87306c053f5fee8f50fd4acc6363526eba0e50b6547667fd683092e4e032cdc&', hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
  ];

  const popularGroups = [
    { id: 1, name: truncateName('Fitness Enthusiasts'), members: 1200, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 2, name: truncateName('Book Club'), members: 800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319182.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgyLnBuZyIsImlhdCI6MTcyNzIzNTcwOCwiZXhwIjoxNzU4NzcxNzA4fQ.EvAjjxeX3ab_wRmddaL647-NnNcSBOxguMPsLS6md3Q&t=2024-09-25T03%3A41%3A48.733Z', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 3, name: truncateName('Tech Innovators'), members: 1500, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 4, name: truncateName('Foodies United'), members: 2000, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319182.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgyLnBuZyIsImlhdCI6MTcyNzIzNTcwOCwiZXhwIjoxNzU4NzcxNzA4fQ.EvAjjxeX3ab_wRmddaL647-NnNcSBOxguMPsLS6md3Q&t=2024-09-25T03%3A41%3A48.733Z', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 5, name: truncateName('Travel Adventurers'), members: 1800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/Frame%20427319181.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvRnJhbWUgNDI3MzE5MTgxLnBuZyIsImlhdCI6MTcyNzIzNTY3OSwiZXhwIjoxNzU4NzcxNjc5fQ._npMOoWg2FhDDwkKmbQBJrdw1U6Z1A6UbOuM5tO4jt4&t=2024-09-25T03%3A41%3A19.419Z', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
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

  const ViewAllButton = ({ onClick }) => (
    <div className="flex-shrink-0 w-40 flex flex-col items-center justify-center">
      <Button
        onClick={onClick}
        className="bg-[#212124] text-white rounded-full w-12 h-12 flex items-center justify-center mb-2"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
      <span className="text-xs text-gray-400">View all</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 mt-8">
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
              <h2 className="text-base font-semibold text-gray-200">My Groups</h2>
              <Button
                onClick={handleCreateGroup}
                className="bg-transparent hover:bg-[#3c3c3f] transition-colors rounded-full flex items-center justify-center text-white p-2"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4" ref={myGroupsRef}>
              <div className="flex space-x-4 px-4" style={{ width: `${(myGroups.length + 1) * 180}px` }}>
                {myGroups.map((group) => (
                  <div key={group.id} className="flex-shrink-0 w-40">
                    <GroupCard 
                      group={group} 
                      hasActivity={group.hasActivity} 
                      lastActivity={group.lastActivity}
                    />
                  </div>
                ))}
                <ViewAllButton onClick={() => navigate('/my-groups')} />
              </div>
            </div>
          </div>

          {/* Updated banner section with consistent side margin */}
          <div className="relative h-80 mb-8 rounded-lg overflow-hidden" style={{
            backgroundImage: "url('https://cdn.discordapp.com/attachments/1057996608261869689/1289781137362784297/Frame_114.png?ex=66fa11ca&is=66f8c04a&hm=af84e535da1462f24ea72c19d7d177918d51d6b409ea43a1e4f58c2f8c3f6297&')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join Together</h2>
              <Button
                onClick={handleCreateGroup}
                className="bg-transparent text-white hover:bg-white hover:bg-opacity-20 transition-colors rounded-full px-6 py-2 font-semibold border border-white"
              >
                Create group
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-200">Recent Activity</h2>
              <button
                className="text-white text-xs font-semibold"
                onClick={() => navigate('/recent-activity')}
              >
                View ({recentActivities.length}) &gt;
              </button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="bg-[#161618] rounded-xl p-4">
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
              <h2 className="text-base font-semibold text-gray-200">Popular</h2>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4" ref={popularGroupsRef}>
              <div className="flex space-x-4 px-4" style={{ width: `${(popularGroups.length + 1) * 180}px` }}>
                {popularGroups.map((group) => (
                  <div key={group.id} className="flex-shrink-0 w-40">
                    <GroupCard group={group} />
                  </div>
                ))}
                <ViewAllButton onClick={() => console.log('View all popular groups')} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Group;
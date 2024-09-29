import React, { useState } from 'react';
import { motion } from "framer-motion";
import ChallengeCard from '../components/ChallengeCard';
import FriendActivity from '../components/FriendActivity';
import UserProfilePopup from '../components/UserProfilePopup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';
import FilterButton from '../components/FilterButton';
import { useNavigate } from 'react-router-dom';
import MyGroups from '../components/MyGroups';

const Friends = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const challenges = [
    { type: "Daily Walk", date: "SEPTEMBER 2024", active: "16.5k", progress: "501/16.5K" },
    { type: "Daily Quiz", date: "SEPTEMBER 2024", active: "16.5k", progress: "11/30" },
  ];

  const filters = [
    { name: "Popular", emoji: "🔥", color: "bg-purple-500" },
    { name: "New", emoji: "✨", color: "bg-blue-500" },
    { name: "Challenge", emoji: "🏆", color: "bg-green-500" },
    { name: "Reward", emoji: "🎁", color: "bg-yellow-500" },
  ];

  const handleNextChallenge = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
  };

  const handleUserClick = (user) => {
    setSelectedUser({
      username: user.name,
      handle: `@${user.name.toLowerCase()}`,
      avatarUrl: user.profilePicture,
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  };

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  const activities = {
    today: [
      { name: "Emma", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTEucG5nIiwiaWF0IjoxNzI1NzE3Mjg1LCJleHAiOjE3NTcyNTMyODV9.qVjtzjCu_bW-iEyzul3BjNeCwoMS6prEcNFETCCBzrs&t=2024-09-07T13%3A54%3A44.233Z" },
      { name: "John", activity: "solved quiz #089 and completed daily quiz. • just now", type: "quiz", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTIucG5nIiwiaWF0IjoxNzI1NzE3Mjk1LCJleHAiOjE3NTcyNTMyOTV9.ZggcfcQRRTSdDHtyXr8Opujx6iGlBEISYrW-scvSMik&t=2024-09-07T13%3A54%3A54.988Z" },
      { name: "Sarah", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTMucG5nIiwiaWF0IjoxNzI1NzE3MzExLCJleHAiOjE3NTcyNTMzMTF9.ghhBkpc92hU749PoU_fV_q0HSHBg4SZw8FVeNDsa8J0&t=2024-09-07T13%3A55%3A10.841Z" },
      { name: "John", activity: "finished walking 1km and completed daily walk. • 3m", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTIucG5nIiwiaWF0IjoxNzI1NzE3Mjk1LCJleHAiOjE3NTcyNTMyOTV9.ZggcfcQRRTSdDHtyXr8Opujx6iGlBEISYrW-scvSMik&t=2024-09-07T13%3A54%3A54.988Z" },
      { name: "Tate", activity: "finished walking 1km and completed daily walk. • 4m", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTQucG5nIiwiaWF0IjoxNzI1NzE3MzE4LCJleHAiOjE3NTcyNTMzMTh9.UcjJ_L92gDVmyvTu_i6hyw0kgw1Y9PUTj4kQrgid-Lg&t=2024-09-07T13%3A55%3A17.985Z" },
    ],
    thisMonth: [
      { name: "Geonu", activity: "finished walking 1km and completed daily walk. • 2d", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTUucG5nIiwiaWF0IjoxNzI1NzE3MzI1LCJleHAiOjE3NTcyNTMzMjV9.e5H4nq1qEjoOIcShw-3CyS_5GieWWhI4cp85LjjW2vo&t=2024-09-07T13%3A55%3A25.054Z" },
      { name: "Astrid", activity: "finished walking 1km and completed daily walk. • 5d", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-6.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTYucG5nIiwiaWF0IjoxNzI1NzE3MzMzLCJleHAiOjE3NTcyNTMzMzN9.RiJUsoSrAUSfqa5YLk4XeYYD2SNed4GWzNkaDB1E7RA&t=2024-09-07T13%3A55%3A32.546Z" },
      { name: "Fitra", activity: "solved quiz #089 and completed daily quiz. • 1w", type: "quiz", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-7.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTcucG5nIiwiaWF0IjoxNzI1NzE3MzQxLCJleHAiOjE3NTcyNTMzNDF9.DGxJJSl_dcl5oFnugAAI_1sbi0Sio-KovJJ0ehhTlCk&t=2024-09-07T13%3A55%3A40.342Z" },
      { name: "Rissa", activity: "finished walking 1km and completed daily walk. • 1w", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-8.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTgucG5nIiwiaWF0IjoxNzI1NzE3MzQ3LCJleHAiOjE3NTcyNTMzNDd9.sLzx_coIRMJcVQqxPoJEd8GP06ZTD6COBjlO4XY4UkA&t=2024-09-07T13%3A55%3A46.800Z" },
    ],
    earlier: [
      { name: "Rissa", activity: "solved quiz #089 and completed daily quiz. • 2w", type: "quiz", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-8.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTgucG5nIiwiaWF0IjoxNzI1NzE3MzQ3LCJleHAiOjE3NTcyNTMzNDd9.sLzx_coIRMJcVQqxPoJEd8GP06ZTD6COBjlO4XY4UkA&t=2024-09-07T13%3A55%3A46.800Z" },
      { name: "John", activity: "finished walking 1km and completed daily walk. • 3w", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTIucG5nIiwiaWF0IjoxNzI1NzE3Mjk1LCJleHAiOjE3NTcyNTMyOTV9.ZggcfcQRRTSdDHtyXr8Opujx6iGlBEISYrW-scvSMik&t=2024-09-07T13%3A54%3A54.988Z" },
      { name: "Tate", activity: "solved quiz #089 and completed daily quiz. • 1m", type: "quiz", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTQucG5nIiwiaWF0IjoxNzI1NzE3MzE4LCJleHAiOjE3NTcyNTMzMTh9.UcjJ_L92gDVmyvTu_i6hyw0kgw1Y9PUTj4kQrgid-Lg&t=2024-09-07T13%3A55%3A17.985Z" },
      { name: "Aquafina", activity: "finished walking 1km and completed daily walk. • 1m", type: "walk", profilePicture: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTEucG5nIiwiaWF0IjoxNzI1NzE3Mjg1LCJleHAiOjE3NTcyNTMyODV9.qVjtzjCu_bW-iEyzul3BjNeCwoMS6prEcNFETCCBzrs&t=2024-09-07T13%3A54%3A44.233Z" },
    ],
  };

  const renderActivitySection = (title, activities) => (
    <>
      <h2 className="text-xs font-semibold mb-3 text-gray-400">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <FriendActivity
            key={index}
            name={activity.name}
            activity={activity.activity}
            type={activity.type}
            profilePicture={activity.profilePicture}
            onUserClick={() => handleUserClick(activity)}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="relative mb-4">
        <motion.div
          className="overflow-hidden"
          animate={{ x: `${-currentChallenge * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <ChallengeCard {...challenge} onNextChallenge={handleNextChallenge} />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-[96%] bg-[#1c1c1f] rounded-full flex items-center justify-between border-8 border-black" style={{ borderWidth: '8px', marginTop: '-12px', height: '80px' }}>
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search groups or challenges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-gray-400 placeholder-gray-400 h-20 rounded-full pl-14 pr-6 w-full"
            />
          </div>
          <Button
            onClick={handleCreateGroup}
            className="bg-transparent hover:bg-[#3c3c3f] transition-colors h-20 rounded-full flex items-center justify-center text-gray-400 px-6"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mb-4 mt-12 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pl-4">
          {filters.map((filter, index) => (
            <FilterButton key={index} name={filter.name} emoji={filter.emoji} color={filter.color} />
          ))}
        </div>
      </div>

      <div className="px-4">
        <MyGroups />
      </div>

      <section className="mt-4 pb-20 space-y-6 px-4">
        {renderActivitySection("TODAY", activities.today)}
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-px bg-[#212124] my-6" />
        {renderActivitySection("THIS MONTH", activities.thisMonth)}
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-px bg-[#212124] my-6" />
        {renderActivitySection("EARLIER", activities.earlier)}
      </section>

      {selectedUser && (
        <UserProfilePopup
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default Friends;
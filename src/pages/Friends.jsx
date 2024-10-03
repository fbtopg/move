import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import FriendActivity from '../components/FriendActivity';
import UserProfilePopup from '../components/UserProfilePopup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommunityGroupCard from '../components/CommunityGroupCard';
import { getRandomProfilePicture } from '../utils/profilePictures';
import SearchPage from '../components/SearchPage';

const Friends = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

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

  const myGroups = [
    { id: 1, name: 'Morning chill', members: 5, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66faae0c&is=66f95c8c&hm=3ae40a6ce831ca6992a2655792e403e571651bae6ce97e02ff481af050edf101&', hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 2, name: 'Climbing bros', members: 8, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66faae0c&is=66f95c8c&hm=88ffad286207907d124033282f6a7b23834433bf82fc746a53cc22e8b287f92c&', hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 3, name: 'Trip', members: 3, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66faae0d&is=66f95c8d&hm=9fb35fec57376e16e7ea9b24ecc907d4497951154ee066a727496112edc8a048&', hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
  ];

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
      <h2 className="text-xs font-semibold mb-2 text-gray-400">{title}</h2>
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
      <div className="px-4 mt-4">
        <div className="relative mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search groups or challenges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1c1c1f] border-none text-gray-400 placeholder-gray-400 h-20 rounded-full pl-14 pr-6 w-full"
              onFocus={() => setIsSearchOpen(true)}
            />
          </div>
          <Button
            onClick={handleCreateGroup}
            className="absolute right-0 top-0 bg-transparent hover:bg-[#3c3c3f] transition-colors h-20 rounded-full flex items-center justify-center text-gray-400 px-6"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide -mx-4">
            <div className="flex space-x-4 px-4" style={{ width: `${(myGroups.length + 1) * 180}px` }}>
              {myGroups.map((group) => (
                <div key={group.id} className="flex-shrink-0 w-full max-w-[180px]">
                  <CommunityGroupCard 
                    group={group} 
                    hasActivity={group.hasActivity}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-4 pb-20 space-y-4 px-4">
        {renderActivitySection("Recent Activity", activities.today)}
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

      <SearchPage
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default Friends;
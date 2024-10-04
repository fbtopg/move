import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import FriendActivity from '../components/FriendActivity';
import UserProfilePopup from '../components/UserProfilePopup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommunityGroupCard from '../components/CommunityGroupCard';
import { getRandomProfilePicture } from '../utils/profilePictures';
import SearchPage from '../components/SearchPage';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

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
      { name: "Emma", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
      { name: "John", activity: "solved quiz #089 and completed daily quiz. • just now", type: "quiz", profilePicture: getRandomProfilePicture() },
      { name: "Sarah", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
    ],
    thisMonth: [
      { name: "Geonu", activity: "finished walking 1km and completed daily walk. • 2d", type: "walk", profilePicture: getRandomProfilePicture() },
      { name: "Astrid", activity: "finished walking 1km and completed daily walk. • 5d", type: "walk", profilePicture: getRandomProfilePicture() },
      { name: "Fitra", activity: "solved quiz #089 and completed daily quiz. • 1w", type: "quiz", profilePicture: getRandomProfilePicture() },
    ],
    earlier: [
      { name: "Rissa", activity: "solved quiz #089 and completed daily quiz. • 2w", type: "quiz", profilePicture: getRandomProfilePicture() },
      { name: "John", activity: "finished walking 1km and completed daily walk. • 3w", type: "walk", profilePicture: getRandomProfilePicture() },
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
        <div className="flex flex-col items-end mb-1">
          <Button
            onClick={() => navigate('/profile')}
            className="bg-transparent hover:bg-secondary transition-colors h-10 w-10 rounded-full flex items-center justify-center mb-1"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z" alt="Profile" />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
          </Button>
          <h1 className="text-2xl font-bold text-foreground self-start">{greeting}</h1>
        </div>
        
        <div className="h-px bg-border w-full mt-1 mb-2"></div>
        
        <div className="mt-8 mb-6">
          <div className="overflow-x-auto scrollbar-hide -mx-4">
            <div className="flex space-x-4 px-4">
              {/* Create Group Button Card */}
              <div className="flex-shrink-0 w-56 h-24">
                <Button
                  onClick={handleCreateGroup}
                  className="w-full h-full bg-[#3B72EC] text-white flex flex-col items-center justify-center rounded-lg"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-sm font-semibold">Create Group</span>
                </Button>
              </div>
              {myGroups.map((group, index) => (
                <div key={group.id} className="flex-shrink-0 w-56">
                  <CommunityGroupCard group={group} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-4 pb-20 space-y-4 px-4">
        {renderActivitySection("Recent Activity", activities.today)}
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-px bg-border my-6" />
        {renderActivitySection("THIS MONTH", activities.thisMonth)}
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-px bg-border my-6" />
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

export default Community;

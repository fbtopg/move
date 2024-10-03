import React, { useState, useRef } from 'react';
import { Search, Plus, ChevronRight, ArrowRight } from 'lucide-react';
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
    { id: 1, name: truncateName('Morning chill'), members: 5, hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 2, name: truncateName('Climbing bros'), members: 8, hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 3, name: truncateName('Trip'), members: 3, hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
  ];

  const popularGroups = [
    { id: 1, name: truncateName('Fitness Enthusiasts'), members: 1200, memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 2, name: truncateName('Book Club'), members: 800, memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 3, name: truncateName('Tech Innovators'), members: 1500, memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 4, name: truncateName('Foodies United'), members: 2000, memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
    { id: 5, name: truncateName('Travel Adventurers'), members: 1800, memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()] },
  ];

  const recentActivities = [
    { name: "Emma", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
    { name: "John", activity: "solved quiz #089 and completed daily quiz. • just now", type: "quiz", profilePicture: getRandomProfilePicture() },
    { name: "Sarah", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
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
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
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
              <button
                className="text-white text-xs font-semibold"
                onClick={() => navigate('/my-groups')}
              >
                View ({myGroups.length}) &gt;
              </button>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4" ref={myGroupsRef}>
              <div className="flex space-x-4 px-4" style={{ width: `${(myGroups.length + 2) * 180}px` }}>
                <div className="flex-shrink-0 w-40">
                  <GroupCard
                    group={{ name: 'Create group', members: 0 }}
                    onClick={handleCreateGroup}
                    isNewGroup={true}
                  />
                </div>
                {myGroups.map((group, index) => (
                  <div key={group.id} className="flex-shrink-0 w-40">
                    <GroupCard 
                      group={group} 
                      hasActivity={group.hasActivity} 
                      lastActivity={group.lastActivity}
                      index={index}
                    />
                  </div>
                ))}
                <ViewAllButton onClick={() => navigate('/my-groups')} />
              </div>
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

          {/* Full-width banner */}
          <div className="relative h-80 mb-8 w-screen -mx-4" style={{
            backgroundImage: "url('https://cdn.discordapp.com/attachments/1057996608261869689/1289781137362784297/Frame_114.png?ex=66fa11ca&is=66f8c04a&hm=af84e535da1462f24ea72c19d7d177918d51d6b409ea43a1e4f58c2f8c3f6297&')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join Together</h2>
              <Button
                onClick={handleCreateGroup}
                className="bg-transparent text-white hover:bg-white hover:bg-opacity-20 transition-colors rounded-full px-6 py-2 font-semibold border border-white flex items-center"
              >
                Create group
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-200">Popular</h2>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4" ref={popularGroupsRef}>
              <div className="flex space-x-4 px-4" style={{ width: `${(popularGroups.length + 1) * 180}px` }}>
                {popularGroups.map((group, index) => (
                  <div key={group.id} className="flex-shrink-0 w-40">
                    <GroupCard group={group} index={index} />
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

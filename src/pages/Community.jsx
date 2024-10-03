import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import FriendActivity from '../components/FriendActivity';
import { useNavigate } from 'react-router-dom';
import { getRandomProfilePicture } from '../utils/profilePictures';

const Community = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  const recentActivities = [
    { name: "Emma", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
    { name: "John", activity: "solved quiz #089 and completed daily quiz. • just now", type: "quiz", profilePicture: getRandomProfilePicture() },
    { name: "Sarah", activity: "finished walking 1km and completed daily walk. • just now", type: "walk", profilePicture: getRandomProfilePicture() },
  ];

  return (
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 mt-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              className="w-full bg-[#1c1c1f] border-none text-gray-400 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search community"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <Button
              onClick={handleCreateGroup}
              className="w-full bg-[#3B72EC] text-white flex items-center justify-center rounded-lg py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Create Group</span>
            </Button>
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
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Community;
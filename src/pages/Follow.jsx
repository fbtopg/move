import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Check, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getRandomProfilePicture } from '../utils/profilePictures';

const Follow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('followers');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (location.state && location.state.initialTab) {
      setActiveTab(location.state.initialTab);
    }
  }, [location]);

  const [followers, setFollowers] = useState([
    { id: 1, username: "Joan Charita", handle: "@charita08", isFollowing: false },
    { id: 2, username: "John Doe", handle: "@johndoe", isFollowing: true },
    { id: 3, username: "Sarah Jones", handle: "@sarahjones", isFollowing: true },
  ]);

  const [following, setFollowing] = useState([
    { id: 1, username: "Emma Smith", handle: "@emmasmith" },
    { id: 5, username: "Alex Wilson", handle: "@alexwilson" },
    { id: 6, username: "Lisa Taylor", handle: "@lisataylor" },
  ]);

  const toggleFollow = (userId, type) => {
    if (type === 'followers') {
      setFollowers(prevFollowers =>
        prevFollowers.map(user =>
          user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
        )
      );
    } else {
      setFollowing(prevFollowing => prevFollowing.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = activeTab === 'followers' ? followers : following;
  const displayUsers = filteredUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-4">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="flex justify-between mb-8 relative">
            <button
              className={`text-base font-normal flex-1 text-center ${activeTab === 'followers' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('followers')}
            >
              {followers.length} Followers
            </button>
            <button
              className={`text-base font-normal flex-1 text-center ${activeTab === 'following' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('following')}
            >
              {following.length} Following
            </button>
            <motion.div
              className="absolute bottom-0 h-0.5 bg-white"
              initial={false}
              animate={{
                left: activeTab === 'followers' ? '0%' : '50%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 bg-gray-800 border-gray-700 text-white rounded-full"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {displayUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="w-6 h-6 mr-3">
                    <AvatarImage src={getRandomProfilePicture()} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-semibold">{user.username}</span>
                    <p className="text-sm text-gray-400">{user.handle}</p>
                  </div>
                </div>
                {activeTab === 'followers' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFollow(user.id, 'followers')}
                    className={user.isFollowing ? "text-green-500" : "text-white"}
                  >
                    {user.isFollowing ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </Button>
                )}
                {activeTab === 'following' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFollow(user.id, 'following')}
                    className="text-green-500"
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Follow;
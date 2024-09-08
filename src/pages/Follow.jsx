import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Check, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  const followers = [
    { id: 1, username: "Joan Charita", handle: "@charita08", isFollowing: false },
    { id: 2, username: "John Doe", handle: "@johndoe", isFollowing: true },
    { id: 3, username: "Sarah Jones", handle: "@sarahjones", isFollowing: true },
  ];

  const following = [
    { id: 1, username: "Emma Smith", handle: "@emmasmith", isFollowing: true },
    { id: 5, username: "Alex Wilson", handle: "@alexwilson", isFollowing: true },
    { id: 6, username: "Lisa Taylor", handle: "@lisataylor", isFollowing: true },
  ];

  const [followState, setFollowState] = useState({
    followers: followers.reduce((acc, user) => ({ ...acc, [user.id]: user.isFollowing }), {}),
    following: following.reduce((acc, user) => ({ ...acc, [user.id]: true }), {}),
  });

  const toggleFollow = (userId, type) => {
    setFollowState(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [userId]: !prevState[type][userId]
      }
    }));
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

          <div className="flex justify-between mb-6">
            <button
              className={`text-2xl font-bold ${activeTab === 'followers' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('followers')}
            >
              {followers.length} Followers
            </button>
            <button
              className={`text-2xl font-bold ${activeTab === 'following' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('following')}
            >
              {following.length} Following
            </button>
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
                  <Avatar className="w-12 h-12 mr-3">
                    <AvatarImage src={getRandomProfilePicture()} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-semibold">{user.username}</span>
                    <p className="text-sm text-gray-400">{user.handle}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFollow(user.id, activeTab)}
                  className={followState[activeTab][user.id] ? "text-green-500" : "text-white"}
                >
                  {followState[activeTab][user.id] ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Follow;
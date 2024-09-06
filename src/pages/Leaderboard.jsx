import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();

  const currentUser = {
    rank: 7,
    name: "You",
    likes: 124,
    distance: "56.7km",
  };

  const leaderboardData = Array.from({ length: 50 }, (_, i) => ({
    rank: i + 1,
    name: `User${i + 1}`,
    likes: Math.floor(Math.random() * 1000),
    distance: `${(Math.random() * 100).toFixed(1)}km`,
  }));

  const UserRow = ({ rank, name, likes, distance, isCurrentUser }) => (
    <div className={`flex items-center justify-between py-3 ${isCurrentUser ? 'bg-blue-900 rounded-lg px-2' : ''}`}>
      <div className="flex items-center space-x-3">
        <span className="w-6 text-center">{rank}</span>
        <Avatar className="w-10 h-10">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <span>{name}</span>
      </div>
      <div className="flex space-x-4">
        <span>{likes} likes</span>
        <span>{distance}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="bg-blue-900 rounded-lg p-4 mb-6">
          <UserRow {...currentUser} isCurrentUser={true} />
        </div>

        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>

        <div className="space-y-2">
          {leaderboardData.map((user) => (
            <UserRow key={user.rank} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
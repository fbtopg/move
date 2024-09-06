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

  const leaderboardData = [
    { rank: 1, name: "John", likes: 987, distance: "98.5km" },
    { rank: 2, name: "Emma", likes: 856, distance: "92.3km" },
    { rank: 3, name: "Alex", likes: 789, distance: "87.1km" },
    { rank: 4, name: "Sarah", likes: 654, distance: "79.8km" },
    { rank: 5, name: "Mike", likes: 543, distance: "72.4km" },
    { rank: 6, name: "Lisa", likes: 432, distance: "68.9km" },
    currentUser,
    { rank: 8, name: "Tom", likes: 98, distance: "45.2km" },
    { rank: 9, name: "Anna", likes: 76, distance: "39.6km" },
    { rank: 10, name: "Chris", likes: 54, distance: "32.1km" },
  ];

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

        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>

        <div className="space-y-2">
          {leaderboardData.map((user) => (
            <UserRow key={user.rank} {...user} isCurrentUser={user.name === "You"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
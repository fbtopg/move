import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';
  const imageUrl = `https://source.unsplash.com/collection/3678981/300x300`;

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div 
        className="h-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="p-4 text-white">
        <p className="text-xs text-gray-400">{date}</p>
        <h2 className="text-2xl font-bold mb-2">{type}</h2>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex -space-x-2">
            <Avatar className="w-6 h-6 border-2 border-gray-800">
              <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=John" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-gray-800">
              <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Jane" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-gray-800">
              <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Bob" />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-gray-400">{active} active</span>
        </div>
        <div>
          <p className="text-lg font-bold">{progress}</p>
          <p className="text-xs text-gray-400">{isWalk ? 'RANK' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
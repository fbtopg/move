import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChallengeCard = ({ type, date, active, progress, gradientColor }) => {
  const isWalk = type === 'Daily Walks';

  return (
    <div className="w-full max-w-md mx-auto text-white flex items-center h-32">
      <div 
        className="w-40 h-32 mr-6 rounded-lg flex-shrink-0"
        style={{
          background: `linear-gradient(45deg, ${gradientColor[0]}, ${gradientColor[1]})`,
        }}
      ></div>
      <div className="flex-grow">
        <div className="pb-2">
          <p className="text-xs text-gray-400">{date}</p>
          <h2 className="text-2xl font-bold">
            {type}
          </h2>
        </div>
        <div>
          <div className="flex items-center space-x-2">
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
          <div className="mt-2">
            <p className="text-lg font-bold">{progress}</p>
            <p className="text-xs text-gray-400">{isWalk ? 'RANK' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
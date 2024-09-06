import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="pb-2">
        <h2 className="text-2xl font-bold">
          {type}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <Avatar className="w-6 h-6 border-2 border-white dark:border-gray-800">
              <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=John" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-white dark:border-gray-800">
              <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Jane" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-white dark:border-gray-800">
              <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Bob" />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{active} active</span>
        </div>
        <div className="mt-4">
          <p className="text-xl font-bold">{progress}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{isWalk ? 'RANK' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';
  const imageUrl = `https://source.unsplash.com/collection/3678981/300x300`;

  return (
    <div className={cn(
      "w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md h-[180px] flex flex-col",
      isWalk ? "bg-light-primary" : "bg-light-accent"
    )}>
      <div 
        className="h-24 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="p-3 text-white flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs text-white/80">{date}</p>
          <h2 className="text-lg font-bold mb-1">{type}</h2>
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex -space-x-2">
              <Avatar className="w-5 h-5 border-2 border-white/20">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-5 h-5 border-2 border-white/20">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Jane" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Avatar className="w-5 h-5 border-2 border-white/20">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Bob" />
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-white/80">{active} active</span>
          </div>
        </div>
        <div>
          {isWalk && <p className="text-xs text-white/80 mb-0.5">RANK</p>}
          <p className="text-base font-bold">{progress}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
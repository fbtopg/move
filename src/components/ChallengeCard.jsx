import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ChallengeCard = ({ type, date, active, progress, currentIndex, totalCards }) => {
  const isWalk = type === 'Daily Walk';
  const imageUrl = `https://source.unsplash.com/collection/3678981/300x300`;

  return (
    <div className="relative">
      <div className={cn(
        "w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg h-[180px] flex flex-col",
        isWalk ? "bg-blue-500" : "bg-green-500"
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
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {Array.from({ length: totalCards }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeCard;
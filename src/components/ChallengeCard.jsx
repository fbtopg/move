import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';
  const imageUrl = isWalk
    ? "https://cdn.discordapp.com/attachments/1057996608261869689/1281512420853944352/Rectangle_6.png?ex=66dbfcf2&is=66daab72&hm=54d3401d917b1176c5ed2054a7f648320c1bd12575272801f6c8fdd986bdaee7&"
    : "https://cdn.discordapp.com/attachments/1057996608261869689/1281512421546262661/Rectangle_7.png?ex=66dbfcf2&is=66daab72&hm=e66dc0b2dc8ee7f23307913a1662f7c1cb2fbc4c4f71899f9d0be4b42f4b63f0&";

  return (
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
  );
};

export default ChallengeCard;
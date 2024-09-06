import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';
  const imageUrl = isWalk
    ? "https://cdn.midjourney.com/d7e39227-437f-4589-ad3e-612659a54916/0_1.png"
    : "https://cdn.midjourney.com/b5b40151-9594-4005-a904-0701c493896b/0_1.png";

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg h-[120px] flex bg-transparent">
      <div 
        className="w-[120px] h-[120px] bg-cover bg-center flex-shrink-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="flex-grow p-3 flex flex-col justify-between">
        <div>
          <p className="text-sm text-white/80 mb-1">{date}</p>
          <h2 className="text-2xl font-bold mb-2 text-white">{type}</h2>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              <Avatar className="w-7 h-7 border-2 border-gray-800">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-7 h-7 border-2 border-gray-800">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Jane" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Avatar className="w-7 h-7 border-2 border-gray-800">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Bob" />
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm text-white/80">{active} active</span>
          </div>
        </div>
        <div>
          {isWalk && <p className="text-sm text-white/80 mb-0.5">RANK</p>}
          <p className="text-xl font-bold text-white">{progress}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
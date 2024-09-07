import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walk';
  const navigate = useNavigate();

  const handleClick = () => {
    if (isWalk) {
      navigate('/daily-walk-challenge');
    } else {
      navigate('/daily-quiz-challenge');
    }
  };

  const gradientColor = isWalk ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600';

  return (
    <div 
      className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg h-[180px] flex cursor-pointer bg-gray-800"
      onClick={handleClick}
    >
      <div className={`w-[180px] h-[180px] bg-gradient-to-b ${gradientColor} flex-shrink-0`}></div>
      <div className="flex-grow p-3 text-white flex flex-col justify-between">
        <div>
          <p className="text-xs text-white/80">{date}</p>
          <h2 className="text-lg font-bold mb-1">{type}</h2>
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex -space-x-2">
              <Avatar className="w-5 h-5 border-2 border-gray-800">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-5 h-5 border-2 border-gray-800">
                <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Jane" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Avatar className="w-5 h-5 border-2 border-gray-800">
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
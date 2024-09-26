import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { getRandomProfilePicture } from '../utils/profilePictures';

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

  const [mainProgress, totalProgress] = progress.split('/');

  return (
    <div 
      className={`w-full max-w-md mx-auto overflow-hidden h-[160px] flex cursor-pointer relative ${isWalk ? 'bg-blue-100' : 'bg-green-100'}`}
      onClick={handleClick}
    >
      <div className="flex-grow flex flex-col justify-between relative py-5 px-5">
        <div className="flex flex-col">
          <p className="text-xs text-black/80 leading-none" style={{ marginTop: '-0.1em', marginBottom: '-0.1em' }}>{date}</p>
          <p className="text-xl font-semibold text-black">{isWalk ? 'Daily Walk' : 'Daily Quiz'}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, index) => (
                <Avatar key={index} className="w-5 h-5 border-2 border-white">
                  <AvatarImage src={getRandomProfilePicture()} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-black/80">{active} active</span>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 text-right">
          <p className="text-xs text-black/80 mb-0.5">{isWalk ? 'RANK' : 'PROGRESS'}</p>
          <p className="text-2xl font-bold leading-none flex items-baseline" style={{ marginTop: '-0.1em', marginBottom: '-0.1em' }}>
            <span className="text-black font-bold">{mainProgress}</span>
            <span className="text-gray-600 text-xl ml-0.5">/{totalProgress}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;

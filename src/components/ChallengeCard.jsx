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

  const squareImageUrl = isWalk
    ? "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20102.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTAyLnBuZyIsImlhdCI6MTcyNjI4ODYyNCwiZXhwIjoxNzU3ODI0NjI0fQ.MsMvXioJ2mxlqql64hI_aFCKVuY4qVrQHbpUG-DTkLQ&t=2024-09-14T04%3A37%3A06.339Z"
    : "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z";

  const [mainProgress, totalProgress] = progress.split('/');

  return (
    <div 
      className="w-full max-w-md mx-auto overflow-hidden h-[140px] flex cursor-pointer relative"
      onClick={handleClick}
    >
      <div 
        className="w-[140px] h-[140px] flex-shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${squareImageUrl})` }}
      ></div>
      <div className="flex-grow pl-4 flex flex-col justify-between relative">
        <div className="flex flex-col">
          <p className="text-xs text-white/80 leading-none" style={{ marginTop: '-0.1em', marginBottom: '-0.1em' }}>{date}</p>
          <p className="text-lg font-semibold text-white">{isWalk ? 'Daily Walk' : 'Daily Quiz'}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, index) => (
                <Avatar key={index} className="w-4 h-4 border-2 border-black">
                  <AvatarImage src={getRandomProfilePicture()} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-white/80">{active} active</span>
          </div>
        </div>
        <div className="absolute bottom-0 right-4 text-right">
          <p className="text-xs text-white/80 mb-0.5">{isWalk ? 'RANK' : 'PROGRESS'}</p>
          <p className="text-xl font-bold leading-none" style={{ marginTop: '-0.1em', marginBottom: '-0.1em' }}>
            <span className="text-white font-bold">{mainProgress}</span>
            <span className="text-gray-400 text-lg">/{totalProgress}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;

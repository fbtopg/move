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
    ? "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailywalkimage5_square.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHl3YWxraW1hZ2U1X3NxdWFyZS5wbmciLCJpYXQiOjE3MjU2ODk4NzcsImV4cCI6MTc1NzIyNTg3N30.nzNH06-Xz9MOJRbXK57YDU031uh7la7_QnXAITE5j8w&t=2024-09-07T06%3A17%3A57.421Z"
    : "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailyquizimage5_square.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHlxdWl6aW1hZ2U1X3NxdWFyZS5wbmciLCJpYXQiOjE3MjU2ODk5MjMsImV4cCI6MTc1NzIyNTkyM30.ELyrp7TizCJbErr5wkfzeDEOQGtdd5KMDiCyR_oNmIk&t=2024-09-07T06%3A18%3A43.653Z";

  return (
    <div 
      className="w-full max-w-md mx-auto overflow-hidden h-[180px] flex cursor-pointer"
      onClick={handleClick}
    >
      <div 
        className="w-[180px] h-[180px] flex-shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${squareImageUrl})` }}
      ></div>
      <div className="flex-grow p-5 text-white flex flex-col justify-between">
        <div>
          <p className="text-xs text-white/80">{date}</p>
          <h2 className="text-2xl font-bold mb-2">{type}</h2>
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, index) => (
                <Avatar key={index} className="w-5 h-5 border-2 border-black">
                  <AvatarImage src={getRandomProfilePicture()} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-white/80">{active} active</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-white/80 mb-0.5">{isWalk ? 'RANK' : 'PROGRESS'}</p>
          <p className="text-base font-bold">{progress}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
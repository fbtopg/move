import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ChallengeCard = ({ type, progress, onNextChallenge }) => {
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

  const profilePicture = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate('/profile');
  };

  return (
    <div 
      className={`w-full overflow-hidden h-[240px] flex flex-col cursor-pointer relative ${isWalk ? 'bg-blue-100' : 'bg-green-100'}`}
      onClick={handleClick}
    >
      <div className="flex-grow flex flex-col justify-between relative py-5 px-5">
        <div className="flex flex-col items-end space-y-2">
          <Avatar className="w-8 h-8 cursor-pointer" onClick={handleProfileClick}>
            <AvatarImage src={profilePicture} alt="Profile" />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
          <button 
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onNextChallenge();
            }}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-5 right-5 text-right">
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

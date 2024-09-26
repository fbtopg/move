import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ChallengeCard = ({ type, onNextChallenge }) => {
  const isWalk = type === 'Daily Walk';
  const navigate = useNavigate();

  const handleClick = () => {
    if (isWalk) {
      navigate('/daily-walk-challenge');
    } else {
      navigate('/daily-quiz-challenge');
    }
  };

  const profilePicture = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate('/profile');
  };

  const backgroundStyle = isWalk
    ? {
        backgroundImage: `url(https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/jellywalk_inflatable_font_text_Daily_Walk_Challenge._--ar_32__f41053c9-cfbe-41f3-bd32-fd72a81e9f65_0%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvamVsbHl3YWxrX2luZmxhdGFibGVfZm9udF90ZXh0X0RhaWx5X1dhbGtfQ2hhbGxlbmdlLl8tLWFyXzMyX19mNDEwNTNjOS1jZmJlLTQxZjMtYmQzMi1mZDcyYTgxZTlmNjVfMCAxLnBuZyIsImlhdCI6MTcyNzMyNDA5NCwiZXhwIjoxNzU4ODYwMDk0fQ.QgGW11MY27XSN8eopytTJe-b1dTLFnwChRS94vvuu_0&t=2024-09-26T04%3A14%3A54.095Z)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: '#DCFCE7' };

  return (
    <div 
      className={`w-full overflow-hidden h-[240px] flex flex-col cursor-pointer relative`}
      style={backgroundStyle}
      onClick={handleClick}
    >
      <div className="flex-grow flex flex-col justify-between relative py-5 px-5">
        <div className="flex flex-col items-end space-y-3">
          <Avatar className="w-12 h-12 cursor-pointer border-2 border-[#212124]" onClick={handleProfileClick}>
            <AvatarImage src={profilePicture} alt="Profile" />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </div>
        <button 
          className="w-12 h-12 bg-[#212124] rounded-full flex items-center justify-center shadow-md self-end mt-auto mb-16"
          onClick={(e) => {
            e.stopPropagation();
            onNextChallenge();
          }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;

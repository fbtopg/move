import React from 'react';
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

  const backgroundStyle = {
    backgroundImage: `url(https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/jellywalk_Wide_banner-style_view_of_a_city_skyline_at_sunrise_18b1217e-a1de-41c2-b9f6-ad91ef777db7_3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvamVsbHl3YWxrX1dpZGVfYmFubmVyLXN0eWxlX3ZpZXdfb2ZfYV9jaXR5X3NreWxpbmVfYXRfc3VucmlzZV8xOGIxMjE3ZS1hMWRlLTQxYzItYjlmNi1hZDkxZWY3NzdkYjdfMy5wbmciLCJpYXQiOjE3MjczMzQzNTgsImV4cCI6MTc1ODg3MDM1OH0.khd3GCr1TE1KEdWUJjYadtduNCItFfbpOgDWPPXxmuI&t=2024-09-26T07%3A05%3A57.812Z)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div 
      className={`w-full overflow-hidden h-[240px] flex flex-col cursor-pointer relative`}
      style={backgroundStyle}
      onClick={handleClick}
    >
      <div className="flex-grow flex flex-col justify-between relative py-5 px-5">
        <div className="flex flex-col items-end space-y-3">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-[#212124]"
            onClick={handleProfileClick}
          />
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

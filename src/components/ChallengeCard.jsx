import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeCard = ({ type, currentChallenge, totalChallenges }) => {
  const isWalk = type === 'Daily Walk';
  const linkTo = isWalk ? '/daily-walk-challenge' : '/daily-quiz-challenge';

  const profilePicture = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z";

  const backgroundStyle = {
    backgroundImage: `url(https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/jellywalk_Wide_banner-style_view_of_a_city_skyline_at_sunrise_18b1217e-a1de-41c2-b9f6-ad91ef777db7_3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvamVsbHl3YWxrX1dpZGVfYmFubmVyLXN0eWxlX3ZpZXdfb2ZfYV9jaXR5X3NreWxpbmVfYXRfc3VucmlzZV8xOGIxMjE3ZS1hMWRlLTQxYzItYjlmNi1hZDkxZWY3NzdkYjdfMy5wbmciLCJpYXQiOjE3MjczMzQzNTgsImV4cCI6MTc1ODg3MDM1OH0.khd3GCr1TE1KEdWUJjYadtduNCItFfbpOgDWPPXxmuI&t=2024-09-26T07%3A05%3A57.812Z)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Link to={linkTo} className="block">
      <div 
        className={`w-full overflow-hidden h-[240px] flex flex-col relative`}
        style={backgroundStyle}
      >
        <div className="flex-grow flex flex-col justify-between relative py-5 px-5">
          <div className="flex flex-col items-end space-y-3">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-[#212124]"
            />
          </div>
          <div className="flex justify-center space-x-2 mt-auto mb-4"> {/* Added mb-4 to move dots upwards */}
            {Array.from({ length: totalChallenges }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentChallenge ? 'bg-white' : 'bg-gray-400'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
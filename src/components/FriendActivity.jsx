import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const getGradient = (name) => {
  const charCode = name.charCodeAt(0);
  const hue1 = (charCode * 7) % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
};

const FriendActivity = ({ name, activity, type, profilePicture, isOwnActivity = false, onOpenSearchCommunity }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const getActivityImage = () => {
    return type === 'walk'
      ? "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailywalkimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHl3YWxraW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU2OTAwNDEsImV4cCI6MTc1NzIyNjA0MX0.em4pNRKKqzuyVl5EvlK2ipc0iaFzFBFIY0fpjcbhqU8&t=2024-09-07T06%3A20%3A41.451Z"
      : "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailyquizimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHlxdWl6aW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU2OTAwODIsImV4cCI6MTc1NzIyNjA4Mn0.Pd1SiAgUnY8OeTe7CrOYIzgibXJ2SOPxKPw4SKcKEwU&t=2024-09-07T06%3A21%3A22.177Z";
  };

  const parseActivity = (activity) => {
    if (!activity) return { activityText: '', activityTime: '' };

    const parts = activity.split('•');
    let activityText = parts[0] ? parts[0].trim() : '';
    let activityTime = parts[1] ? parts[1].trim() : '';

    activityText = activityText.replace(/\b(walk|quiz)/g, '$1');

    const timeMatch = activityText.match(/(\d+[mhdw])$/);
    if (timeMatch) {
      activityTime = timeMatch[1];
      activityText = activityText.replace(/\s+\d+[mhdw]$/, '');
    }

    if (activityText.includes('solved the quiz')) {
      const quizNumber = ' #' + String(Math.floor(Math.random() * 999)).padStart(3, '0');
      activityText = activityText.replace('solved the quiz', `solved the quiz${quizNumber}`);
    }

    activityText = activityText.replace(/\./g, '').trim() + '.';

    return { activityText, activityTime };
  };

  const { activityText, activityTime } = parseActivity(activity);

  const handleImageClick = () => {
    if (type === 'walk') {
      navigate('/daily-walk-challenge');
    } else if (type === 'quiz') {
      navigate('/daily-quiz-challenge');
    }
  };

  const handleAvatarClick = () => {
    if (isOwnActivity) {
      navigate('/profile');
    } else {
      onOpenSearchCommunity();
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-10 h-10 mt-1 flex-shrink-0 cursor-pointer" onClick={handleAvatarClick}>
        {profilePicture ? (
          <AvatarImage src={profilePicture} alt={name} />
        ) : (
          <AvatarFallback style={{ background: getGradient(name) }} className="text-white font-semibold">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-grow min-w-0 pr-2">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">{name}</span>{' '}
              <span className="break-words">{activityText}</span>
              {activityTime && (
                <span className="text-[#73777F] ml-1">{activityTime}</span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div 
              className="w-10 h-10 rounded-lg bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url(${getActivityImage()})`,
              }}
              onClick={handleImageClick}
            ></div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 ${liked ? "text-white" : "text-gray-500"} bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendActivity;
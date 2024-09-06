import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, type }) => {
  const [liked, setLiked] = useState(false);
  const imageUrl = `https://source.unsplash.com/collection/3678981/100x100`;

  const getActivityColor = () => {
    return type === 'walk' ? 'bg-blue-500' : 'bg-green-500';
  };

  const parseActivity = (activity) => {
    if (!activity) return { activityText: '', activityTime: '' };

    const parts = activity.split('•');
    let activityText = parts[0] ? parts[0].trim().replace('daily walk', 'daily walk') : '';
    let activityTime = parts[1] ? parts[1].trim() : '';

    if (activityText.includes('solved the quiz')) {
      const quizNumber = ' #' + String(Math.floor(Math.random() * 999)).padStart(3, '0');
      activityText = activityText.replace('solved the quiz', `solved the quiz${quizNumber}`);
    }

    return { activityText, activityTime };
  };

  const highlightText = (text, time) => {
    const highlightedText = text
      .replace(/(\d+(?:\.\d+)?(?:km|m))/, '<span class="text-white">$1</span>')
      .replace(/(quiz #\d{3})/, '<span class="text-white">$1</span>');
    
    return `${highlightedText} <span class="text-gray-500">${time}</span>`;
  };

  const { activityText, activityTime } = parseActivity(activity);
  const parsedActivity = highlightText(activityText, activityTime);

  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-10 h-10 mt-1 flex-shrink-0">
        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-grow min-w-0 pr-2">
            <p className="text-sm text-white">
              <span className="font-semibold">{name}</span>{' '}
              <span 
                className="text-gray-400 break-words"
                dangerouslySetInnerHTML={{ __html: parsedActivity }}
              />
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div 
              className={`w-10 h-10 rounded-lg bg-cover bg-center ${getActivityColor()}`}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            ></div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 ${liked ? "text-white" : "text-gray-500"} hover:bg-transparent`}
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
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, type }) => {
  const [liked, setLiked] = useState(false);
  const imageUrl = `https://source.unsplash.com/collection/3678981/100x100`;

  const getActivityColor = () => 'bg-gray-700';

  const [activityText, activityTime] = activity.split('•');

  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-10 h-10 mt-1">
        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <p className="text-sm text-white">
              <span className="font-semibold">{name}</span>{' '}
              <span className="text-gray-400">{activityText.trim()}</span>{' '}
              <span className="text-gray-600">• {activityTime.trim()}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
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
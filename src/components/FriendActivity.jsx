import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FriendActivity = ({ name, activity, type, profilePicture, isOwnActivity = false }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const getActivityGradient = () => {
    switch (type) {
      case 'walk':
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'quiz':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };

  const [content, timestamp] = activity.split(' • ');

  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
        {profilePicture ? (
          <AvatarImage src={profilePicture} alt={name} />
        ) : (
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-grow min-w-0 pr-2">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">{name}</span>{' '}
              <span className="break-words">{content}</span>
              {timestamp && (
                <span className="text-xs ml-1" style={{ color: '#50545B' }}>{timestamp}</span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div 
              className={`w-10 h-10 rounded-lg ${getActivityGradient()}`}
            ></div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLike}
              className={cn(
                "w-8 h-8 p-0",
                liked ? "text-white" : "text-gray-500",
                "bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent"
              )}
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
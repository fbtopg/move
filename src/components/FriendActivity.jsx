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

  const getActivityImage = () => {
    return "https://cdn.discordapp.com/attachments/1057996608261869689/1290150604097978398/Frame_115.png?ex=66fb69e1&is=66fa1861&hm=4fcb702fd10072483f6a0363f452f4c923ad099c7bd67e8735df63e4b74fa417&";
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
              className="w-10 h-10 rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${getActivityImage()})`,
              }}
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
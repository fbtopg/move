import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footprints, Brain } from 'lucide-react';

const FriendActivity = ({ name, activity, type, profilePicture, onUserClick }) => {
  const [content, timestamp] = activity.split(' • ');

  const getActivityIcon = () => {
    switch (type) {
      case 'walk':
        return <Footprints className="w-4 h-4 text-blue-500" />;
      case 'quiz':
        return <Brain className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onUserClick}
    >
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-sm font-semibold text-gray-800">{name}</p>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            {getActivityIcon()}
            <p>{content}</p>
          </div>
        </div>
        {timestamp && (
          <p className="text-xs text-gray-400">{timestamp}</p>
        )}
      </div>
    </div>
  );
};

export default FriendActivity;
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getGradientColor = (index) => {
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-purple-500'
  ];
  return gradients[index % gradients.length];
};

const FriendActivity = ({ name, activity, type, profilePicture, onUserClick }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="w-10 h-10 cursor-pointer" onClick={onUserClick}>
        <AvatarImage src={profilePicture} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="text-sm">
          <span className="font-semibold">{name}</span> {activity}
        </p>
      </div>
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getGradientColor(name.length)}`}></div>
    </div>
  );
};

export default FriendActivity;
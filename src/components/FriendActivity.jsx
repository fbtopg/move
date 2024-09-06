import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, time, type, liked }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3 flex-grow">
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center space-x-1">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-sm text-gray-600">{activity}</p>
          </div>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className={liked ? "text-red-500" : "text-gray-400"}>
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FriendActivity;
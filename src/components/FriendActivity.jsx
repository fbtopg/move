import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, time, type, liked, gradientColor }) => {
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
              <span className="font-semibold">{name}</span> {activity}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-sm"
              style={{
                background: `linear-gradient(45deg, ${gradientColor[0]}, ${gradientColor[1]})`,
              }}
            ></div>
            <p className="text-xs text-gray-500">{time}</p>
            <Button variant="ghost" size="sm" className={liked ? "text-red-500" : "text-gray-500"}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendActivity;
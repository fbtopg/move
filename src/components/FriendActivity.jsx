import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, time, type, liked }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3 flex-grow">
        <Avatar>
          <div className={`w-8 h-8 rounded-full bg-${getColorByName(name)}-500`}></div>
        </Avatar>
        <div className="flex-grow">
          <p className="text-sm">
            <span className="font-semibold">{name}</span>{' '}
            <span className="text-gray-600">{activity}</span>
          </p>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className={liked ? "text-red-500" : "text-gray-400"}>
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  );
};

const getColorByName = (name) => {
  const colors = ['blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'red', 'orange'];
  return colors[name.length % colors.length];
};

export default FriendActivity;
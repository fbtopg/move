import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, time, type, liked }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Avatar>
          <div className={`w-10 h-10 rounded-full bg-${getColorByName(name)}-500`}></div>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{activity}. {time}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className={liked ? "text-red-500" : "text-gray-400"}>
        <Heart className="h-5 w-5" />
      </Button>
    </div>
  );
};

const getColorByName = (name) => {
  const colors = ['blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'red', 'orange'];
  return colors[name.length % colors.length];
};

export default FriendActivity;
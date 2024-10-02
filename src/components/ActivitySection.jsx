import React from 'react';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getGradientColor = (index) => {
  const colors = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-purple-500'
  ];
  return colors[index % colors.length];
};

const ActivityItem = ({ name, activity, time, index }) => (
  <div className="flex items-start space-x-3 mb-4">
    <Avatar className="w-10 h-10">
      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-grow">
      <p className="text-sm">
        <span className="font-semibold">{name}</span> {activity}
      </p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getGradientColor(index)}`}></div>
    <Heart className="w-5 h-5 text-gray-400" />
  </div>
);

const ActivitySection = () => {
  const activities = [
    { name: "Emma", activity: "finished walking 12km and completed daily walk.", time: "just now" },
    { name: "John", activity: "solved the quiz #838 today and completed daily quiz.", time: "just now" },
    { name: "Sarah", activity: "finished walking 800m and completed daily walk.", time: "just now" },
    { name: "John", activity: "finished walking 1km and completed daily walk.", time: "3m" },
    { name: "Tate", activity: "finished walking 500m and completed daily walk.", time: "4m" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">TODAY</h2>
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} index={index} />
      ))}
    </div>
  );
};

export default ActivitySection;
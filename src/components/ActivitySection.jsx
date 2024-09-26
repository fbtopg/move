import React from 'react';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ActivityItem = ({ name, activity, time, image }) => (
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
    <img src={image} alt="Activity" className="w-10 h-10 rounded-lg object-cover" />
    <Heart className="w-5 h-5 text-gray-400" />
  </div>
);

const ActivitySection = () => {
  const activities = [
    { name: "Emma", activity: "finished walking 12km and completed daily walk.", time: "just now", image: "https://picsum.photos/200" },
    { name: "John", activity: "solved the quiz #838 today and completed daily quiz.", time: "just now", image: "https://picsum.photos/201" },
    { name: "Sarah", activity: "finished walking 800m and completed daily walk.", time: "just now", image: "https://picsum.photos/202" },
    { name: "John", activity: "finished walking 1km and completed daily walk.", time: "3m", image: "https://picsum.photos/203" },
    { name: "Tate", activity: "finished walking 500m and completed daily walk.", time: "4m", image: "https://picsum.photos/204" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">TODAY</h2>
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} />
      ))}
    </div>
  );
};

export default ActivitySection;
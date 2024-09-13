import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FriendActivity = ({ name, activity, type }) => {
  const [liked, setLiked] = useState(false);
  const imageUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${name}`;

  const getActivityImage = () => {
    return type === 'walk' 
      ? "https://cdn.discordapp.com/attachments/1057996608261869689/1281512422162567191/Rectangle_8.png?ex=66dbfcf2&is=66daab72&hm=b01c1e98a4bc863609753a7707f62e731f19cb0bcd2226b2488c6f3fce80a1ca&"
      : "https://cdn.discordapp.com/attachments/1057996608261869689/1281512422447906816/Rectangle_9.png?ex=66dbfcf2&is=66daab72&hm=e239ba258966fc38c5516304f67284662d1905276b91bfe254c8bac2e0e34b40&";
  };

  const parseActivity = (activity) => {
    const [activityText, activityTime] = activity.split('•');
    let parsedText = activityText.trim();

    if (parsedText.includes('solved the quiz')) {
      const quizNumber = ' #' + String(Math.floor(Math.random() * 999)).padStart(3, '0');
      parsedText = parsedText.replace('solved the quiz', `solved the quiz${quizNumber}`);
    }

    return { parsedText, activityTime: activityTime.trim() };
  };

  const { parsedText, activityTime } = parseActivity(activity);

  const highlightText = (text) => {
    return text
      .replace(/(\d+(?:\.\d+)?(?:km|m))/, '<span class="text-white">$1</span>')
      .replace(/(quiz #\d{3})/, '<span class="text-white">$1</span>');
  };

  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-10 h-10 mt-1 flex-shrink-0">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-grow min-w-0 pr-2">
            <p className="text-sm text-white">
              <span className="font-semibold">{name}</span>{' '}
              <span 
                className="text-gray-400 break-words"
                dangerouslySetInnerHTML={{ __html: highlightText(parsedText) }}
              />
            </p>
            <p className="text-xs text-gray-600">{activityTime}</p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div 
              className="w-10 h-10 rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${getActivityImage()})`,
              }}
            ></div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 ${liked ? "text-white" : "text-gray-500"} hover:bg-transparent`}
              onClick={() => setLiked(!liked)}
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
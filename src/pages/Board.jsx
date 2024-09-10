import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';

const Board = () => {
  const [activeTab, setActiveTab] = React.useState('board');

  const newsItems = [
    { label: "Label", headline: "News Headline", likes: "1.6k", comments: "560" },
    { label: "Label", headline: "News Headline", likes: "1.6k", comments: "560" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex mb-8">
            {['Quiz', 'News', 'Community'].map((item) => (
              <div key={item} className="flex flex-col items-center mr-4">
                <Button
                  variant="ghost"
                  className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none mb-1"
                >
                  {item[0]}
                </Button>
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">Today's Quiz</h2>
          <div className="bg-white text-black rounded-lg p-4 mb-8 aspect-square flex flex-col justify-between">
            <p className="text-sm text-gray-600">Quiz #089</p>
            <h3 className="text-lg font-semibold">How many steps a day should you walk to keep healthy?</h3>
          </div>

          <h2 className="text-xl font-bold mb-4">News</h2>
          {newsItems.map((item, index) => (
            <div key={index} className="bg-white text-black rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">{item.label}</p>
              <h3 className="text-lg font-semibold mb-2">{item.headline}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Heart className="w-4 h-4 mr-1" />
                <span className="mr-4">{item.likes}</span>
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>{item.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Board;
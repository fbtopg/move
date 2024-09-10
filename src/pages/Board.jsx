import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';

const Board = () => {
  const [activeTab, setActiveTab] = React.useState('board');

  const headerItems = ['Quiz', 'News', 'Community'];

  const newsItems = [
    { label: "Label", headline: "News Headline", likes: "1.6k", comments: "560" },
    { label: "Label", headline: "News Headline", likes: "1.6k", comments: "560" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          <div className="flex mb-8 -ml-2 mt-8"> {/* Changed mt-4 to mt-8 for more top margin */}
            {headerItems.map((item) => (
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
          <div className="aspect-square mb-8 rounded-lg overflow-hidden relative">
            <img 
              src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NSAoMSkucG5nIiwiaWF0IjoxNzI1OTM2MjUwLCJleHAiOjE3NTc0NzIyNTB9.kn7-2IZsbyj28fZxa2AFPlf8HgTv_b8s2GqS3W_qw2M&t=2024-09-10T02%3A44%3A10.934Z" 
              alt="Today's Quiz" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <p className="text-sm font-semibold mb-2">Quiz #089</p>
              <h3 className="text-4xl font-light text-white">
                What is the capital of Indonesia?
              </h3>
            </div>
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
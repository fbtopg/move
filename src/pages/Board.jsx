import React, { useState, useEffect } from 'react';
import { Globe, Zap, Flame, Bell } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import NewsItems from '../components/NewsItems';
import { Button } from "@/components/ui/button";

const Board = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  const [newsItems, setNewsItems] = useState([
    { id: 1, date: "11.09.2024", headline: "New Feature: Daily Challenges", likes: "1.6k", comments: "560", isLiked: false, isCommentsOpen: false },
    { id: 2, date: "10.09.2024", headline: "Community Milestone: 1 Million Users!", likes: "2.3k", comments: "720", isLiked: false, isCommentsOpen: false },
    { id: 3, date: "09.09.2024", headline: "Introducing Weekly Leaderboards", likes: "1.8k", comments: "630", isLiked: false, isCommentsOpen: false },
    { id: 4, date: "08.09.2024", headline: "App Update: Enhanced User Profiles", likes: "1.4k", comments: "480", isLiked: false, isCommentsOpen: false },
  ]);

  const handleLike = (itemType, itemId) => {
    if (itemType === 'news') {
      setNewsItems(prev => prev.map(item => 
        item.id === itemId ? {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? (parseInt(item.likes) - 0.1).toFixed(1) + 'k' : (parseInt(item.likes) + 0.1).toFixed(1) + 'k'
        } : item
      ));
    }
  };

  const toggleComments = (itemType, itemId) => {
    if (itemType === 'news') {
      setNewsItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, isCommentsOpen: !item.isCommentsOpen } : item
      ));
    }
  };

  const handleNotificationClick = () => {
    // Placeholder for notification functionality
    console.log("Notification button clicked");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="sticky top-0 z-10 bg-black p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upcoming</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNotificationClick}
          className="text-white hover:bg-gray-800"
        >
          <Bell className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto pb-20 pt-1">
        <div className="max-w-md mx-auto p-2">
          <NewsItems
            items={newsItems}
            onLike={handleLike}
            onComment={toggleComments}
          />
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Board;

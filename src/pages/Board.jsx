import React, { useState, useEffect } from 'react';
import { Globe, Zap, LayoutGrid } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import NewsItems from '../components/NewsItems';

const Board = () => {
  const [activeTab, setActiveTab] = useState('board');
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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

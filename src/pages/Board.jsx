import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Zap, HelpCircle, Newspaper, Users } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import QuizDetails from '../components/QuizDetails';
import TodaysQuiz from '../components/TodaysQuiz';
import NewsItems from '../components/NewsItems';
import HeaderItems from '../components/HeaderItems';

const Board = () => {
  const [activeTab, setActiveTab] = useState('board');
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const headerItems = [
    { name: 'Quiz', icon: HelpCircle },
    { name: 'News', icon: Newspaper },
    { name: 'Community', icon: Users }
  ];

  const [todaysQuiz, setTodaysQuiz] = useState({
    title: "Today's Quiz",
    question: "What is the capital of Indonesia?",
    image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/quiz/Frame%2095%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcXVpei9GcmFtZSA5NSAoMSkucG5nIiwiaWF0IjoxNzI1OTM2MjUwLCJleHAiOjE3NTc0NzIyNTB9.kn7-2IZsbyj28fZxa2AFPlf8HgTv_b8s2GqS3W_qw2M&t=2024-09-10T02%3A44%3A10.934Z",
    participants: [
      { id: 1, name: "John" },
      { id: 2, name: "Emma" },
      { id: 3, name: "Alex" },
      { id: 4, name: "Sarah" },
      { id: 5, name: "Mike" },
    ],
    activeParticipants: "16.5k",
    likes: "1.2k",
    comments: "324",
    isLiked: false,
    isCommentsOpen: false
  });

  const [newsItems, setNewsItems] = useState([
    { id: 1, label: "Label", headline: "News Headline", likes: "1.6k", comments: "560", isLiked: false, isCommentsOpen: false },
    { id: 2, label: "Label", headline: "News Headline", likes: "1.6k", comments: "560", isLiked: false, isCommentsOpen: false },
  ]);

  const handleHeaderItemClick = (item) => {
    if (item === 'Quiz') {
      navigate('/quiz');
    }
  };

  const handleLike = (itemType, itemId) => {
    if (itemType === 'quiz') {
      setTodaysQuiz(prev => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? (parseInt(prev.likes) - 1).toString() + 'k' : (parseInt(prev.likes) + 1).toString() + 'k'
      }));
    } else if (itemType === 'news') {
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
    if (itemType === 'quiz') {
      setTodaysQuiz(prev => ({
        ...prev,
        isCommentsOpen: !prev.isCommentsOpen
      }));
    } else if (itemType === 'news') {
      setNewsItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, isCommentsOpen: !item.isCommentsOpen } : item
      ));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          <HeaderItems items={headerItems} onItemClick={handleHeaderItemClick} />
          <div className="h-px bg-gray-700 my-4"></div>
          <TodaysQuiz
            quiz={todaysQuiz}
            onQuizClick={() => setSelectedQuiz(todaysQuiz)}
            onLike={() => handleLike('quiz')}
            onComment={() => toggleComments('quiz')}
          />
          <NewsItems
            items={newsItems}
            onLike={handleLike}
            onComment={toggleComments}
          />
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {selectedQuiz && (
        <QuizDetails
          quiz={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
          handleLike={handleLike}
          toggleComments={toggleComments}
        />
      )}
    </div>
  );
};

export default Board;
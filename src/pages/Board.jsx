import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, HelpCircle, Newspaper, Users } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';
import { shareInvite } from '../utils/shareUtils';

const Comment = ({ author, content, timestamp }) => (
  <div className="flex items-start space-x-2 mb-4">
    <Avatar className="w-8 h-8">
      <AvatarImage src={getRandomProfilePicture()} alt={author} />
      <AvatarFallback>{author[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-sm font-semibold">{author}</p>
      <p className="text-sm text-gray-300">{content}</p>
      <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
    </div>
  </div>
);

const Board = () => {
  const [activeTab, setActiveTab] = useState('board');
  const navigate = useNavigate();

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
    // Add navigation for other items if needed
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

  const mockComments = [
    { author: "Alice", content: "Great question!", timestamp: "2h ago" },
    { author: "Bob", content: "I think I know the answer.", timestamp: "1h ago" },
    { author: "Charlie", content: "This one's tricky!", timestamp: "30m ago" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          <div className="flex mb-8 ml-2 mt-8">
            {headerItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center mr-4">
                <Button
                  variant="ghost"
                  className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none mb-1 flex items-center justify-center"
                  onClick={() => handleHeaderItemClick(item.name)}
                >
                  <item.icon className="w-6 h-6" />
                </Button>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today's Quiz</h2>
            <div className="flex items-center">
              <div className="flex -space-x-2 overflow-hidden mr-2">
                {todaysQuiz.participants.slice(0, 3).map((participant) => (
                  <Avatar key={participant.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                    <AvatarImage src={getRandomProfilePicture()} alt={participant.name} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-400">{todaysQuiz.activeParticipants} active</span>
            </div>
          </div>

          <div 
            className="aspect-square mb-4 rounded-lg overflow-hidden relative cursor-pointer"
            onClick={() => navigate('/quiz')}
          >
            <img 
              src={todaysQuiz.image}
              alt="Today's Quiz" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold mb-2">Quiz #089</p>
                <h3 className="text-4xl font-light text-white mb-4 text-left">
                  {todaysQuiz.question}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center mb-4">
            <Button 
              variant="ghost" 
              className={`flex items-center ${todaysQuiz.isLiked ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
              onClick={() => handleLike('quiz')}
            >
              <Heart className={`w-4 h-4 mr-1 ${todaysQuiz.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-xs">{todaysQuiz.likes} Likes</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex items-center ${todaysQuiz.isCommentsOpen ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-1`}
              onClick={() => toggleComments('quiz')}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">{todaysQuiz.comments} Comments</span>
            </Button>
            <Button variant="ghost" className="flex items-center text-gray-400 hover:text-white p-1" onClick={shareInvite}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {todaysQuiz.isCommentsOpen && (
            <div className="mt-4 bg-gray-900 p-4 rounded-lg mb-4">
              <h4 className="text-sm font-semibold mb-2">Comments</h4>
              {mockComments.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </div>
          )}

          <h2 className="text-xl font-bold mb-4">News</h2>
          {newsItems.map((item) => (
            <div key={item.id} className="bg-[#111111] text-white rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-400 mb-2">{item.label}</p>
              <h3 className="text-lg font-semibold mb-2">{item.headline}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <Button 
                  variant="ghost" 
                  className={`flex items-center ${item.isLiked ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-0`}
                  onClick={() => handleLike('news', item.id)}
                >
                  <Heart className={`w-4 h-4 mr-1 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="text-xs">{item.likes} Likes</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`flex items-center ${item.isCommentsOpen ? 'text-white' : 'text-gray-400'} hover:text-white mr-4 p-0`}
                  onClick={() => toggleComments('news', item.id)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{item.comments} Comments</span>
                </Button>
                <Button variant="ghost" className="flex items-center text-gray-400 hover:text-white p-0" onClick={shareInvite}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              {item.isCommentsOpen && (
                <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Comments</h4>
                  {mockComments.map((comment, index) => (
                    <Comment key={index} {...comment} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Board;
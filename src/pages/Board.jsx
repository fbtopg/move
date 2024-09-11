import React, { useState, useEffect } from 'react';
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
  const [timer, setTimer] = useState('23:59:59');

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
      { id: 1, name: "John", avatar: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTEucG5nIiwiaWF0IjoxNzI1NzE3Mjg1LCJleHAiOjE3NTcyNTMyODV9.qVjtzjCu_bW-iEyzul3BjNeCwoMS6prEcNFETCCBzrs&t=2024-09-07T13%3A54%3A44.233Z" },
      { id: 2, name: "Emma", avatar: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTIucG5nIiwiaWF0IjoxNzI1NzE3Mjk1LCJleHAiOjE3NTcyNTMyOTV9.ZggcfcQRRTSdDHtyXr8Opujx6iGlBEISYrW-scvSMik&t=2024-09-07T13%3A54%3A54.988Z" },
      { id: 3, name: "Alex", avatar: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTMucG5nIiwiaWF0IjoxNzI1NzE3MzExLCJleHAiOjE3NTcyNTMzMTF9.ghhBkpc92hU749PoU_fV_q0HSHBg4SZw8FVeNDsa8J0&t=2024-09-07T13%3A55%3A10.841Z" },
      { id: 4, name: "Sarah", avatar: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTQucG5nIiwiaWF0IjoxNzI1NzE3MzE4LCJleHAiOjE3NTcyNTMzMTh9.UcjJ_L92gDVmyvTu_i6hyw0kgw1Y9PUTj4kQrgid-Lg&t=2024-09-07T13%3A55%3A17.985Z" },
      { id: 5, name: "Mike", avatar: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/image-5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL2ltYWdlLTUucG5nIiwiaWF0IjoxNzI1NzE3MzI1LCJleHAiOjE3NTcyNTMzMjV9.e5H4nq1qEjoOIcShw-3CyS_5GieWWhI4cp85LjjW2vo&t=2024-09-07T13%3A55%3A25.054Z" },
    ],
    activeParticipants: "16.5k",
  });

  const [newsItems, setNewsItems] = useState([
    { id: 1, label: "Label", headline: "News Headline", likes: "1.6k", comments: "560", isLiked: false, isCommentsOpen: false },
    { id: 2, label: "Label", headline: "News Headline", likes: "1.6k", comments: "560", isLiked: false, isCommentsOpen: false },
  ]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
      const kstNow = new Date(now);
      const hours = 23 - kstNow.getHours();
      const minutes = 59 - kstNow.getMinutes();
      const seconds = 59 - kstNow.getSeconds();

      setTimer(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleHeaderItemClick = (item) => {
    if (item === 'Quiz') {
      navigate('/quiz');
    }
  };

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
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          <HeaderItems items={headerItems} onItemClick={handleHeaderItemClick} />
          <div className="h-px bg-gray-700 my-4"></div>
          <TodaysQuiz
            quiz={todaysQuiz}
            onQuizClick={() => setSelectedQuiz(todaysQuiz)}
            timer={timer}
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
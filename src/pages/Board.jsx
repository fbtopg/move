import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Board = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const navigate = useNavigate();

  const challenges = [
    { id: 1, title: 'Daily Walk Challenge', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30', participants: 15600, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20102.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTAyLnBuZyIsImlhdCI6MTcyNjI4ODYyNCwiZXhwIjoxNzU3ODI0NjI0fQ.MsMvXioJ2mxlqql64hI_aFCKVuY4qVrQHbpUG-DTkLQ&t=2024-09-14T04%3A37%3A06.339Z' },
    { id: 2, title: 'Daily Quiz Challenge', type: 'quiz', startDate: '2024-09-01', endDate: '2024-09-30', participants: 12400, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z' },
    { id: 3, title: 'Monthly Step Count', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30', participants: 9800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/jellywalk_Wide_banner-style_view_of_a_city_skyline_at_sunrise_18b1217e-a1de-41c2-b9f6-ad91ef777db7_3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvamVsbHl3YWxrX1dpZGVfYmFubmVyLXN0eWxlX3ZpZXdfb2ZfYV9jaXR5X3NreWxpbmVfYXRfc3VucmlzZV8xOGIxMjE3ZS1hMWRlLTQxYzItYjlmNi1hZDkxZWY3NzdkYjdfMy5wbmciLCJpYXQiOjE3MjczMzQzNTgsImV4cCI6MTc1ODg3MDM1OH0.khd3GCr1TE1KEdWUJjYadtduNCItFfbpOgDWPPXxmuI&t=2024-09-26T07%3A05%3A57.812Z' },
  ];

  const ChallengeCard = ({ challenge }) => (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg mb-6"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="relative h-48">
        <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="text-white text-xl font-bold">{challenge.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">
          {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-500 font-semibold">{challenge.participants.toLocaleString()} participants</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
            onClick={() => navigate(`/${challenge.type}-challenge`)}
          >
            Join Now
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
      <div className="sticky top-0 z-10 bg-[#FEF8F3] px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="w-6"></div>
          <h1 className="text-lg font-semibold text-center flex-grow">Challenge</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-300">
            <button
              className={`pb-2 px-4 ${activeTab === 'discover' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
            <button
              className={`pb-2 px-4 ${activeTab === 'myChallenge' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('myChallenge')}
            >
              My Challenge
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Input
              className="w-full bg-white border-none text-gray-900 placeholder-gray-500 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search challenges"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Challenge list */}
          <div className="space-y-6">
            {challenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
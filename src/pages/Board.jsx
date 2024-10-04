import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import ChallengeItem from '../components/ChallengeItem';

const Board = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const navigate = useNavigate();

  // Sample challenge data (replace with actual data fetching logic)
  const discoverChallenges = [
    { id: 1, title: 'Daily Walk Challenge', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30' },
    { id: 2, title: 'Daily Quiz Challenge', type: 'quiz', startDate: '2024-09-01', endDate: '2024-09-30' },
    { id: 3, title: 'Monthly Step Count', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30' },
  ];

  // Sample user's challenges (replace with actual user's challenge data)
  const myChallenges = [
    { id: 4, title: 'My Walking Challenge', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30' },
    { id: 5, title: 'My Quiz Streak', type: 'quiz', startDate: '2024-09-01', endDate: '2024-09-30' },
  ];

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

          {/* Content area */}
          <div className="space-y-4">
            {activeTab === 'discover' ? (
              discoverChallenges.map(challenge => (
                <ChallengeItem key={challenge.id} challenge={challenge} />
              ))
            ) : (
              myChallenges.map(challenge => (
                <ChallengeItem key={challenge.id} challenge={challenge} />
              ))
            )}
          </div>
        </div>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import { Footprints, Brain } from 'lucide-react';

const ChallengeItem = ({ challenge }) => {
  const { title, startDate, endDate, type } = challenge;

  const getIcon = () => {
    switch (type) {
      case 'walk':
        return <Footprints className="w-6 h-6 text-blue-400" />;
      case 'quiz':
        return <Brain className="w-6 h-6 text-green-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const Board = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingChallenges = [
    { id: 1, title: "10K Steps Challenge", startDate: "2024-04-01", endDate: "2024-04-30", type: "walk" },
    { id: 2, title: "Trivia Master", startDate: "2024-04-15", endDate: "2024-05-15", type: "quiz" },
    { id: 3, title: "Spring Fitness Challenge", startDate: "2024-05-01", endDate: "2024-05-31", type: "walk" },
    { id: 4, title: "Geography Quiz Marathon", startDate: "2024-05-10", endDate: "2024-06-10", type: "quiz" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Upcoming Challenges</h1>
          {upcomingChallenges.length > 0 ? (
            <div className="space-y-4">
              {upcomingChallenges.map((challenge) => (
                <ChallengeItem key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-20">
              No upcoming challenges at the moment.
            </div>
          )}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Board;
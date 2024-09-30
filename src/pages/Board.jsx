import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import ChallengeItem from '../components/ChallengeItem';

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
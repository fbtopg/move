import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';

const Board = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Upcoming Challenges</h1>
          <div className="text-center text-gray-400 mt-20">
            No upcoming challenges at the moment.
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Board;
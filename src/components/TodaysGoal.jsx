import React from 'react';
import { Circle } from 'lucide-react';

const TodaysGoal = () => {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-4 mb-6">
      <div className="flex items-center">
        <Circle className="w-10 h-10 text-gray-300 mr-4" />
        <div>
          <h2 className="text-xs font-medium text-gray-500">Today's Goal</h2>
          <p className="text-base font-bold text-gray-800">Walk 1,000 steps</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysGoal;
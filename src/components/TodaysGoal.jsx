import React from 'react';
import { Circle } from 'lucide-react';

const TodaysGoal = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center">
        <Circle className="w-12 h-12 text-gray-300 mr-4" />
        <div>
          <h2 className="text-sm font-medium text-gray-500">Today's Goal</h2>
          <p className="text-2xl font-bold text-gray-800">Read 5 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysGoal;
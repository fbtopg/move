import React from 'react';
import { Calendar, Footprints, Brain } from 'lucide-react';

const ChallengeItem = ({ challenge }) => {
  const { title, startDate, endDate, type } = challenge;

  const getIcon = () => {
    switch (type) {
      case 'walk':
        return <Footprints className="w-6 h-6 text-blue-400" />;
      case 'quiz':
        return <Brain className="w-6 h-6 text-green-400" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-400" />;
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

export default ChallengeItem;
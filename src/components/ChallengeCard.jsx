import React from 'react';

const ChallengeCard = ({ type, date, active, progress }) => {
  const isWalk = type === 'Daily Walks';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="pb-2">
        <h2 className="text-2xl font-bold">
          {date}
          <br />
          {type}
        </h2>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
          </div>
          <span className="text-sm text-gray-600">{active} active</span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">{progress}</p>
          <p className="text-sm text-gray-600">{isWalk ? 'RANK' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
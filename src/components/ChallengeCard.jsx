import React from 'react';

const ChallengeCard = ({ type, date, active, progress }) => {
  return (
    <div className="w-full aspect-[4/3] bg-gradient-to-b from-blue-500 to-blue-700 p-6 relative">
      <p className="text-sm text-white/80 mb-2">{date}</p>
      <h2 className="text-2xl font-bold mb-4">{type}</h2>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div>
          <p className="text-sm text-white/80 mb-1">Active</p>
          <p className="text-lg font-semibold">{active}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/80 mb-1">Progress</p>
          <p className="text-3xl font-bold">{progress}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;

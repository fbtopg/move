import React from 'react';

const ChallengeProgress = () => {
  const challenges = [
    { type: "September walk challenge", rank: "1st/120.6k" },
    { type: "Daily Quiz", rank: "11th/120.6k" },
  ];

  return (
    <div className="mb-4 overflow-x-auto scrollbar-hide">
      <div className="flex space-x-4">
        {challenges.map((challenge, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="border border-gray-700 rounded-xl p-3 w-40 h-20 flex flex-col justify-between">
              <p className="text-[10px] text-gray-400">{challenge.type}</p>
              <p className="text-sm font-bold text-white mt-auto">{challenge.rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeProgress;
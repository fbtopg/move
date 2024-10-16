import React from 'react';

const ChallengeCardSkeleton = () => {
  return (
    <div className="w-full bg-gradient-to-br from-pink-100 to-white rounded-xl p-8 shadow-lg flex flex-col items-center animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
      
      <div className="w-full mb-8">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="w-full h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default ChallengeCardSkeleton;
import React from 'react';

const ChallengeCardSkeleton = () => {
  return (
    <div className="w-64 bg-gradient-to-br from-pink-100 to-white rounded-xl p-6 shadow-lg flex flex-col items-center animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-6"></div>
      
      <div className="w-full mb-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center mb-3">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-3"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="w-full h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default ChallengeCardSkeleton;
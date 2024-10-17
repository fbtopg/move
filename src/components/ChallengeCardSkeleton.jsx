import React from 'react';

const ChallengeCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-blue-100 via-pink-100 to-blue-200 rounded-xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
      
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-start">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="w-full h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default ChallengeCardSkeleton;
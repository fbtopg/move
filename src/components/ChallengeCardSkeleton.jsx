import React from 'react';

const ChallengeCardSkeleton = () => {
  return (
    <div className="w-full bg-gradient-to-br from-pink-100 to-white rounded-xl p-8 shadow-lg flex flex-col items-center animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
      
      <div className="flex justify-between items-start mb-8 w-full">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col items-center flex-1 px-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        ))}
      </div>

      <div className="w-full h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default ChallengeCardSkeleton;
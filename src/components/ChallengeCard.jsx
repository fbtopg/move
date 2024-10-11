import React from 'react';

const ChallengeCard = ({ challenge }) => {
  // Check if challenge is undefined and provide a default object if it is
  const safeChallenge = challenge || {};
  
  return (
    <div className="w-40 flex-shrink-0">
      <div className="w-40 h-40 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={safeChallenge.image || 'https://via.placeholder.com/150'}
          alt={safeChallenge.title || 'Challenge'}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{safeChallenge.owner || 'Unknown'}</p>
        <h3 className="text-sm font-medium text-black">{safeChallenge.title || 'Untitled Challenge'}</h3>
      </div>
    </div>
  );
};

export default ChallengeCard;
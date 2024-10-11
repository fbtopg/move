import React from 'react';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="w-48 flex-shrink-0">
      <div className="w-full aspect-w-16 aspect-h-10 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={challenge.image || 'https://via.placeholder.com/150'}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-1">
        <p className="text-xs text-gray-500">{challenge.owner}</p>
        <h3 className="text-xs font-medium text-black truncate">{challenge.title}</h3>
      </div>
    </div>
  );
};

export default ChallengeCard;
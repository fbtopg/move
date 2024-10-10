import React from 'react';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="w-40 flex-shrink-0">
      <div className="w-40 h-40 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={challenge.image_url || 'https://via.placeholder.com/150'}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{challenge.owner}</p>
        <h3 className="text-sm font-medium text-black">{challenge.title}</h3>
      </div>
    </div>
  );
};

export default ChallengeCard;
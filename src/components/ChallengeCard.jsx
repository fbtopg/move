import React from 'react';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="w-32 flex-shrink-0">
      <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={challenge.image || 'https://via.placeholder.com/150'}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-0.5">
        <p className="text-[10px] text-gray-500 truncate">{challenge.owner}</p>
        <h3 className="text-[11px] font-medium text-black truncate">{challenge.title}</h3>
      </div>
    </div>
  );
};

export default ChallengeCard;
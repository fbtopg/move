import React from 'react';

const FilterButton = ({ name, emoji, color, members, isGroup = false }) => {
  return (
    <button className={`${color} bg-opacity-20 rounded-full py-3 px-4 flex-shrink-0 min-w-[100px] ${isGroup ? 'border border-gray-600' : ''}`}>
      <div className={`text-sm font-semibold flex items-center justify-center ${name === 'New' ? 'text-blue-500' : 'text-white'}`}>
        {isGroup ? (
          <>
            <span className="mr-2">{name}</span>
            <span className="text-xs text-gray-400">{members} members</span>
          </>
        ) : (
          <>
            <span className="mr-2">{emoji}</span>
            {name}
          </>
        )}
      </div>
    </button>
  );
};

export default FilterButton;
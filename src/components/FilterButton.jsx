import React from 'react';

const FilterButton = ({ name, emoji, color, members, isGroup = false, hasActivity = false }) => {
  if (isGroup) {
    return (
      <button className={`${color} bg-opacity-20 rounded-full py-3 px-4 flex-shrink-0 min-w-[100px] border border-gray-600 text-left relative`}>
        {hasActivity && (
          <span className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
        <div className="text-sm font-semibold text-white">
          {name}
        </div>
        <div className="text-[10px] text-gray-500 -mt-0.5">
          {members}
        </div>
      </button>
    );
  }

  return (
    <button className={`${color} bg-opacity-20 rounded-full py-3 px-4 flex-shrink-0 min-w-[100px]`}>
      <div className={`text-sm font-semibold flex items-center justify-center ${name === 'New' ? 'text-blue-500' : 'text-white'}`}>
        <span className="mr-2">{emoji}</span>
        {name}
      </div>
    </button>
  );
};

export default FilterButton;
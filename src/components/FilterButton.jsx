import React from 'react';

const FilterButton = ({ name, emoji, color, members, isGroup = false }) => {
  if (isGroup) {
    return (
      <button className={`${color} bg-opacity-20 rounded-full py-3 px-4 flex-shrink-0 min-w-[100px] border border-gray-600 text-left`}>
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
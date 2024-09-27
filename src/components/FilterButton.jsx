import React from 'react';

const FilterButton = ({ name, emoji, color }) => {
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
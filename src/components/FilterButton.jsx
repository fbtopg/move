import React from 'react';

const FilterButton = ({ name, emoji, color }) => {
  return (
    <button className={`${color} bg-opacity-25 text-white rounded-full py-2 px-4 flex-shrink-0 min-w-[120px]`}>
      <div className="text-sm font-semibold flex items-center justify-center">
        <span className="mr-2">{emoji}</span>
        {name}
      </div>
    </button>
  );
};

export default FilterButton;
import React from 'react';

const GroupButton = ({ name, members }) => {
  return (
    <button className="bg-[#212124] text-white rounded-full py-2 px-4 flex-shrink-0 min-w-[120px]">
      <div className="text-sm font-semibold">{name}</div>
      <div className="text-xs text-gray-400">{members} members</div>
    </button>
  );
};

export default GroupButton;

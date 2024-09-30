import React from 'react';

const FeatureButton = ({ icon: Icon, label }) => {
  return (
    <button className="bg-[#1c1c1f] text-white rounded-xl p-3 flex flex-col items-start w-full">
      <Icon className="text-blue-400 mb-6" size={22} /> {/* Increased size from 18 to 22 */}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
};

export default FeatureButton;
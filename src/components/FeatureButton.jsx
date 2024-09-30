import React from 'react';

const FeatureButton = ({ icon: Icon, label }) => {
  return (
    <button className="bg-[#1c1c1f] text-white rounded-xl p-3 flex flex-col items-start w-full">
      <Icon className="text-blue-400 mb-2" size={18} /> {/* Increased mb-1 to mb-2 */}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
};

export default FeatureButton;
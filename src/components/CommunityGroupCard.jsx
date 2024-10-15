import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CommunityGroupCard = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { group } });
  };

  return (
    <motion.div
      className="relative w-40 h-40 rounded-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <img 
        src={group.image || 'https://via.placeholder.com/160'} 
        alt={group.name || 'Group'} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
        <h3 className="text-white text-lg font-bold">{group.name}</h3>
        <button className="bg-[#CBFB45] text-black font-semibold py-2 px-4 rounded-full w-full">
          {group.isJoined ? 'View' : 'Join'}
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
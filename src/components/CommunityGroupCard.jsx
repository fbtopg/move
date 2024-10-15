import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

const CommunityGroupCard = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { group } });
  };

  return (
    <motion.div
      className="relative w-48 h-48 rounded-lg overflow-hidden cursor-pointer" // Increased from w-40 h-40 to w-48 h-48
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <img 
        src={group.image || 'https://via.placeholder.com/192'} // Increased from 160 to 192
        alt={group.name || 'Group'} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-white text-lg font-bold mb-1">{group.name}</h3>
          <div className="flex items-center text-white text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>{group.member_count || 0} members</span>
          </div>
        </div>
        <button className="bg-[#CBFB45] text-black font-semibold py-2 px-4 rounded-full w-full">
          {group.isJoined ? 'View' : 'Join'}
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
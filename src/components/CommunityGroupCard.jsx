import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Users } from 'lucide-react';

const CommunityGroupCard = ({ group, index }) => {
  const navigate = useNavigate();
  const truncateName = (name) => (name && name.length > 20 ? name.slice(0, 20) + '...' : name || 'Unnamed Group');

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { group } });
  };

  return (
    <motion.div
      className="w-32 flex-shrink-0 cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden relative">
        <img src={group.image || 'https://via.placeholder.com/150'} alt={group.name || 'Group'} className="w-full h-full object-cover" />
        {group.isOwner && (
          <div className="absolute top-1 right-1 bg-yellow-400 rounded-full p-0.5">
            <Crown className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      <div className="mt-0.5">
        <h3 className="text-[11px] font-medium text-gray-800 truncate">{truncateName(group.name)}</h3>
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center">
            <Users className="w-3 h-3 text-gray-400 mr-0.5" />
            <span className="text-[10px] text-gray-500">{group.members || 0}</span>
          </div>
          {group.isOwner && <span className="text-[10px] font-medium text-yellow-600">Owner</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
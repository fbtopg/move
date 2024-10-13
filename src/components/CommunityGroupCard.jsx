import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Users } from 'lucide-react';

const CommunityGroupCard = ({ group }) => {
  const navigate = useNavigate();
  const truncateName = (name) => (name && name.length > 15 ? name.slice(0, 15) + '...' : name || 'Unnamed Group');

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { group } });
  };

  const renderMemberCount = () => {
    return (
      <span className="text-xs text-gray-500">
        {group.members || 0} members
      </span>
    );
  };

  return (
    <motion.div
      className="w-24 h-24 flex-shrink-0 relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
        <img 
          src={group.image || 'https://via.placeholder.com/100'} 
          alt={group.name || 'Group'} 
          className="w-full h-full object-cover"
        />
      </div>
      {group.isOwner && (
        <div className="absolute top-0 right-0 bg-yellow-400 rounded-full p-1">
          <Crown className="w-3 h-3 text-white" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 py-1">
        <h3 className="text-xs font-semibold text-white truncate px-1">{truncateName(group.name)}</h3>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
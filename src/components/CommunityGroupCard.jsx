import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Users, Infinity } from 'lucide-react';

const CommunityGroupCard = ({ group, index }) => {
  const navigate = useNavigate();
  const truncateName = (name) => name.length > 25 ? name.slice(0, 25) + '...' : name;
  const truncateDescription = (desc) => desc.length > 30 ? desc.slice(0, 30) + '...' : desc;

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { ...group } });
  };

  const renderCapacity = () => {
    if (group.capacity === 'unlimited') {
      return (
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-1">{group.members}</span>
          <Infinity className="w-3 h-3 text-gray-400" />
        </div>
      );
    } else {
      return (
        <span className="text-xs text-gray-500">
          {group.members}/{group.capacity}
        </span>
      );
    }
  };

  return (
    <motion.div
      className="w-full max-w-[250px] h-56 rounded-xl overflow-hidden relative bg-white cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className="h-[55%] relative">
        <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        {group.isOwner && (
          <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
            <Crown className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col h-[45%] relative">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base text-gray-800 truncate">{truncateName(group.name)}</h3>
        </div>
        <p className="text-xs text-gray-600 mb-2 truncate">{truncateDescription(group.description)}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-1" />
            {renderCapacity()}
          </div>
        </div>
        <div className="absolute bottom-1 left-3 text-xs font-medium">
          {group.isOwner ? (
            <span className="text-yellow-600">Owner</span>
          ) : group.isJoined ? (
            <span className="text-green-600">Member</span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
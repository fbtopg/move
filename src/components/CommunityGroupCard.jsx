import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Users } from 'lucide-react';

const CommunityGroupCard = ({ group, index }) => {
  const navigate = useNavigate();
  const truncateName = (name) => name.length > 20 ? name.slice(0, 20) + '...' : name;
  const truncateDescription = (desc) => desc.length > 30 ? desc.slice(0, 30) + '...' : desc;

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { ...group } });
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
      <div className="p-4 flex flex-col h-[45%] relative">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-lg text-gray-800 truncate">{truncateName(group.name)}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2 truncate">{truncateDescription(group.description)}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-1" />
            <p className="text-sm text-gray-500">{group.members} members</p>
          </div>
          <div className="flex -space-x-2">
            {group.memberProfiles.slice(0, 3).map((profile, index) => (
              <div key={index} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
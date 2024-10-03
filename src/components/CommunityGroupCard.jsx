import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getGradientColor = (index) => {
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-purple-500'
  ];
  return gradients[index % gradients.length];
};

const CommunityGroupCard = ({ group, onClick, index }) => {
  const truncateName = (name) => {
    return name.length > 14 ? name.slice(0, 14) + '...' : name;
  };

  return (
    <motion.div
      className="w-40 h-20 rounded-lg overflow-hidden relative bg-[#1a1a1d] p-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="flex items-center h-full">
        <div className={`w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gradient-to-br ${getGradientColor(index)}`} />
        <div className="flex flex-col justify-center flex-grow">
          <div className="flex items-start">
            <h3 className="font-semibold text-xs mb-1 truncate text-white mr-2">{truncateName(group.name)}</h3>
            {group.hasActivity && (
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></span>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {group.memberProfiles.slice(0, 3).map((profile, index) => (
                <Avatar key={index} className="w-4 h-4 border border-[#1a1a1d]">
                  <AvatarImage src={profile} alt={`Member ${index + 1}`} />
                  <AvatarFallback>{index + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-[10px] text-gray-400">{group.members} members</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
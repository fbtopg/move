import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from 'lucide-react';
import { getRandomProfilePicture } from '../utils/profilePictures';

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

const GroupCard = ({ group, hasActivity = false, onClick, isNewGroup = false, lastActivity, index }) => {
  const truncateName = (name) => {
    return name.length > 14 ? name.slice(0, 14) + '...' : name;
  };

  return (
    <motion.div
      className="flex-shrink-0 w-full rounded-lg overflow-hidden relative bg-[#1a1a1d] p-4 h-52"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto relative">
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          {isNewGroup ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <Plus className="h-10 w-10 text-white" />
            </div>
          ) : (
            <div className={`w-full h-full rounded-full overflow-hidden bg-gradient-to-br ${getGradientColor(index)}`} />
          )}
        </div>
        <h3 className="font-semibold text-sm mb-1 truncate text-gray-200">{truncateName(group.name)}</h3>
        {!isNewGroup && (
          <>
            <div className="flex items-center justify-center mt-2">
              <div className="flex -space-x-2 mr-2">
                {(group.memberProfiles || [1, 2, 3]).slice(0, 3).map((profile, index) => (
                  <Avatar key={index} className="w-4 h-4 border border-gray-800">
                    <AvatarImage src={typeof profile === 'string' ? profile : getRandomProfilePicture()} alt={`Member ${index + 1}`} />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-xs text-gray-400">{group.members} members</p>
            </div>
            {lastActivity && (
              <p className="text-[10px] text-yellow-400 mt-1">Last activity: {lastActivity}</p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GroupCard;
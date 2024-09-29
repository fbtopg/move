import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfilePicture } from '../utils/profilePictures';

const GroupCard = ({ group, hasActivity = false, gradient, onClick, isNewGroup = false, lastActivity }) => {
  const formatMemberCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  return (
    <motion.div
      className="flex-shrink-0 w-full rounded-lg overflow-hidden relative bg-[#3c3c3f] p-4"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto relative" style={gradient ? { background: gradient } : {}}>
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          {isNewGroup ? (
            <div className="w-full h-full flex items-center justify-center">
              <Plus className="h-10 w-10 text-white" />
            </div>
          ) : (
            <>
              {!gradient && group.image && (
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-start justify-center">
          <h3 className="font-semibold text-sm mb-1 truncate">{group.name}</h3>
          {hasActivity && (
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full ml-1 mt-1"></div>
          )}
        </div>
        {!isNewGroup && (
          <>
            <p className="text-xs text-gray-400">{formatMemberCount(group.members)} members</p>
            {lastActivity && (
              <p className="text-xs text-yellow-400 mt-1">Last activity: {lastActivity}</p>
            )}
            {group.memberProfiles && (
              <div className="flex justify-center mt-2">
                {group.memberProfiles.slice(0, 3).map((profile, index) => (
                  <Avatar key={index} className="w-6 h-6 -ml-1 first:ml-0 border border-gray-800">
                    <AvatarImage src={profile} alt={`Member ${index + 1}`} />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GroupCard;
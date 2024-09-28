import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const GroupCard = ({ group, hasActivity = false, gradient, onClick, isNewGroup = false }) => {
  const formatMemberCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  const backgroundStyle = gradient
    ? { background: gradient }
    : { backgroundImage: `url(${group.image})`, backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <motion.div
      className="flex-shrink-0 w-24 rounded-lg overflow-hidden relative bg-gray-800 p-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-2 mx-auto relative" style={backgroundStyle}>
          {isNewGroup ? (
            <div className="w-full h-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-white" />
            </div>
          ) : (
            !gradient && <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex items-start justify-center">
          <h3 className="font-semibold text-xs mb-1 truncate">{group.name}</h3>
          {hasActivity && (
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full ml-1 mt-1"></div>
          )}
        </div>
        {!isNewGroup && (
          <p className="text-[10px] text-gray-400">{formatMemberCount(group.members)} members</p>
        )}
      </div>
    </motion.div>
  );
};

export default GroupCard;
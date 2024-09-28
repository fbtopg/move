import React from 'react';
import { motion } from 'framer-motion';

const GroupCard = ({ group }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-24 rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="p-2 text-center"> {/* Added text-center class here */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-2 mx-auto">
          <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-semibold text-xs mb-1 truncate">{group.name}</h3>
        <p className="text-[10px] text-gray-400">{group.members} members</p>
      </div>
    </motion.div>
  );
};

export default GroupCard;
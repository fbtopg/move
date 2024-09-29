import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityGroupCard = ({ group, onClick }) => {
  const truncateName = (name) => {
    return name.length > 14 ? name.slice(0, 14) + '...' : name;
  };

  return (
    <motion.div
      className="flex-shrink-0 w-full rounded-lg overflow-hidden relative bg-[#1a1a1d] p-3 h-20"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="flex items-center h-full">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold text-xs mb-1 truncate text-white">{truncateName(group.name)}</h3>
          <p className="text-[10px] text-gray-400">{group.members} members</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
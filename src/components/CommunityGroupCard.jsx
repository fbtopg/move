import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityGroupCard = ({ group, onClick }) => {
  const truncateName = (name) => {
    return name.length > 14 ? name.slice(0, 14) + '...' : name;
  };

  return (
    <motion.div
      className="flex-shrink-0 w-full rounded-lg overflow-hidden relative bg-[#1a1a1d] p-4 h-40"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 mx-auto relative">
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          <div className="w-full h-full rounded-full overflow-hidden">
            <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <h3 className="font-semibold text-sm mb-1 truncate text-white">{truncateName(group.name)}</h3>
        <p className="text-xs text-gray-400">{group.members} members</p>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
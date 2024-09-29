import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityGroupCard = ({ group, onClick }) => {
  const truncateName = (name) => {
    return name.length > 20 ? name.slice(0, 20) + '...' : name;
  };

  return (
    <motion.div
      className="w-full rounded-lg overflow-hidden relative bg-[#1a1a1d] p-4 h-24"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="flex items-center h-full">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center flex-grow">
          <h3 className="font-semibold text-sm mb-1 truncate text-white">{truncateName(group.name)}</h3>
          <p className="text-xs text-gray-400">{group.members} members</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
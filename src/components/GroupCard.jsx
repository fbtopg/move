import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GroupCard = ({ group }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-40 bg-[#212124] rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="p-4">
        <div className="text-3xl mb-2">{group.icon}</div>
        <h3 className="font-semibold text-sm mb-1">{group.name}</h3>
        <p className="text-xs text-gray-400 mb-3 flex items-center">
          <Users className="w-3 h-3 mr-1" />
          {group.members} members
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
        >
          Join
        </Button>
      </div>
    </motion.div>
  );
};

export default GroupCard;
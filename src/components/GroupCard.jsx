import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupCard = ({ group }) => {
  const truncateName = (name) => name.length > 20 ? name.slice(0, 20) + '...' : name;
  const truncateDescription = (desc) => desc && desc.length > 50 ? desc.slice(0, 50) + '...' : desc;

  return (
    <div className="bg-[#1a1a1d] rounded-lg shadow-md p-4 w-full h-full flex flex-col">
      <div className="flex items-center mb-2">
        <Avatar className="h-12 w-12 mr-2">
          <AvatarImage src={group.image} alt={group.name} />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-semibold truncate flex-1">{truncateName(group.name)}</h3>
      </div>
      <p className="text-xs text-gray-400 mb-2 flex-grow overflow-hidden">
        {truncateDescription(group.description)}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-500">{group.member_count || 0} members</span>
        <button className="bg-[#3B72EC] text-white px-3 py-1 rounded-full text-xs">View</button>
      </div>
    </div>
  );
};

export default GroupCard;
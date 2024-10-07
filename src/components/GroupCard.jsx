import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupCard = ({ group }) => {
  const truncateName = (name) => name.length > 20 ? name.slice(0, 20) + '...' : name;
  const truncateDescription = (desc) => desc && desc.length > 50 ? desc.slice(0, 50) + '...' : desc;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-40 h-48 flex flex-col">
      <div className="flex items-center mb-2">
        <Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={group.image} alt={group.name} />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-semibold truncate">{truncateName(group.name)}</h3>
      </div>
      <p className="text-xs text-gray-600 mb-2 flex-grow overflow-hidden">
        {truncateDescription(group.description)}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-500">{group.members} members</span>
        <button className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">Join</button>
      </div>
    </div>
  );
};

export default GroupCard;
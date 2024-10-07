import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupCard = ({ group }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={group.image} alt={group.name} className="object-cover" />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{group.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{group.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{group.members} members</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Join</button>
      </div>
    </div>
  );
};

export default GroupCard;
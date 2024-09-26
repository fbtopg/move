import React from 'react';
import { Button } from "@/components/ui/button";

const PopularGroupCard = ({ group }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-[#212124] rounded-lg overflow-hidden">
      <img src={group.image} alt={group.name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
        <p className="text-sm text-gray-400 mb-3">{group.members} members</p>
        <Button variant="outline" size="sm" className="w-full rounded-full">
          Join
        </Button>
      </div>
    </div>
  );
};

export default PopularGroupCard;

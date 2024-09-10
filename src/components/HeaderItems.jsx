import React from 'react';
import { Button } from "@/components/ui/button";

const HeaderItems = ({ items, onItemClick }) => (
  <div className="flex mb-8 ml-2 mt-8">
    {items.map((item) => (
      <div key={item.name} className="flex flex-col items-center mr-4">
        <Button
          variant="ghost"
          className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none mb-1 flex items-center justify-center"
          onClick={() => onItemClick(item.name)}
        >
          <item.icon className="w-6 h-6" />
        </Button>
        <span className="text-xs">{item.name}</span>
      </div>
    ))}
  </div>
);

export default HeaderItems;
import React from 'react';
import { Users, Walk, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuickstartMenu = ({ onClose }) => {
  const options = [
    { label: 'New Group', icon: Users, action: () => console.log('New Group') },
    { label: 'Walk', icon: Walk, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#212124] rounded-lg p-4 w-64">
        {options.map((option, index) => (
          <Button
            key={index}
            className="w-full mb-2 flex items-center justify-start bg-[#2c2c30] hover:bg-[#3c3c40] text-white"
            onClick={() => {
              option.action();
              onClose();
            }}
          >
            <option.icon className="mr-2" size={18} />
            {option.label}
          </Button>
        ))}
        <Button
          className="w-full mt-2 bg-[#3c3c40] hover:bg-[#4c4c50] text-white"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuickstartMenu;
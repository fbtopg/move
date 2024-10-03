import React from 'react';
import { Users, Footprints, Trophy, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuickstartMenu = ({ onClose }) => {
  const options = [
    { label: 'New Group', icon: Users, action: () => console.log('New Group') },
    { label: 'Walk', icon: Footprints, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
    { label: 'Close', icon: X, action: onClose },
  ];

  return (
    <>
      {/* Dimming overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      <div className="fixed inset-x-0 bottom-20 flex justify-center items-end z-50">
        <div className="flex space-x-6 mb-4"> {/* Increased space between buttons */}
          {options.map((option, index) => (
            <Button
              key={index}
              className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center" // Increased size to w-16 h-16
              onClick={option.action}
            >
              <option.icon className="h-8 w-8" /> {/* Increased icon size */}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickstartMenu;
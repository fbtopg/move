import React from 'react';
import { Users, Footprints, Trophy, X, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuickstartMenu = ({ onClose }) => {
  const options = [
    { label: 'New Group', icon: Users, action: () => console.log('New Group') },
    { label: 'Walk', icon: Footprints, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
    { label: 'Close', icon: X, action: onClose },
  ];

  return (
    <div className="fixed inset-x-0 bottom-20 flex justify-center items-end z-50">
      <div className="flex space-x-4 mb-4">
        {options.map((option, index) => (
          <Button
            key={index}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
            onClick={option.action}
          >
            <option.icon className="h-6 w-6" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickstartMenu;
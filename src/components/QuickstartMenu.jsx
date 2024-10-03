import React from 'react';
import { Users, Footprints, Trophy, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuickstartMenu = ({ onClose }) => {
  const options = [
    { label: 'New Group', icon: Users, action: () => console.log('New Group') },
    { label: 'Walk', icon: Footprints, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
  ];

  return (
    <>
      {/* Dimming overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      <div className="fixed inset-x-0 bottom-20 flex justify-center items-end z-50">
        <div className="relative w-64 h-48">
          {options.map((option, index) => {
            const angle = Math.PI + (index / (options.length - 1)) * Math.PI;
            const x = 32 + Math.cos(angle) * 80; // 80 is the radius of the arc
            const y = Math.sin(angle) * 80;

            return (
              <Button
                key={index}
                className="absolute w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                style={{
                  left: `${x}px`,
                  bottom: `${y}px`,
                  transform: 'translate(-50%, 50%)'
                }}
                onClick={option.action}
              >
                <option.icon className="h-6 w-6" />
              </Button>
            );
          })}
          
          {/* Main quickstart button */}
          <Button
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
            onClick={onClose}
          >
            <X className="h-8 w-8 text-primary-foreground stroke-2" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuickstartMenu;
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
        <div className="relative w-64 h-32">
          {options.map((option, index) => {
            const angle = -Math.PI / 3 + (index / (options.length - 1)) * (2 * Math.PI / 3);
            const x = 32 + Math.cos(angle) * 80; // 80 is the radius of the arc
            const y = 32 - Math.sin(angle) * 40; // 40 to make it a flatter arc

            return (
              <Button
                key={index}
                className="absolute w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={option.action}
              >
                <option.icon className="h-6 w-6" />
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuickstartMenu;
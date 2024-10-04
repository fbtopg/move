import React, { useEffect, useState } from 'react';
import { Users, Footprints, Trophy, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const QuickstartMenu = ({ onClose }) => {
  const [showGroups, setShowGroups] = useState(false);

  const options = [
    { label: 'New Group', icon: Users, action: () => setShowGroups(!showGroups) },
    { label: 'Walk', icon: Footprints, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
    { label: 'Close', icon: X, action: onClose },
  ];

  // Sample group data (replace with actual data fetching logic)
  const myGroups = [
    { id: 1, name: 'Morning chill', image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66faae0c&is=66f95c8c&hm=3ae40a6ce831ca6992a2655792e403e571651bae6ce97e02ff481af050edf101&' },
    { id: 2, name: 'Climbing bros', image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66faae0c&is=66f95c8c&hm=88ffad286207907d124033282f6a7b23834433bf82fc746a53cc22e8b287f92c&' },
    { id: 3, name: 'Trip', image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66faae0d&is=66f95c8d&hm=9fb35fec57376e16e7ea9b24ecc907d4497951154ee066a727496112edc8a048&' },
  ];

  useEffect(() => {
    // Set status bar color to #FEF8F3 and dim it when QuickstartMenu is open
    document.body.style.setProperty('--status-bar-color', '#FEF8F3');
    document.body.classList.add('dimmed-status-bar');

    return () => {
      // Reset status bar color and remove dimming effect when QuickstartMenu is closed
      document.body.style.removeProperty('--status-bar-color');
      document.body.classList.remove('dimmed-status-bar');
    };
  }, []);

  return (
    <>
      {/* Dimming overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      <div className="fixed inset-x-0 bottom-20 flex flex-col items-center z-50">
        <AnimatePresence>
          {showGroups && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mb-4 max-h-60 overflow-y-auto"
            >
              {myGroups.map((group) => (
                <Button
                  key={group.id}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center mb-2"
                  onClick={() => console.log(`Clicked ${group.name}`)}
                >
                  <img src={group.image} alt={group.name} className="w-full h-full object-cover rounded-full" />
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex space-x-6 mb-4">
          {options.map((option, index) => (
            <Button
              key={index}
              className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
              onClick={option.action}
            >
              {index === 0 && showGroups ? (
                <ChevronDown className="h-8 w-8" />
              ) : (
                <option.icon className="h-8 w-8" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickstartMenu;
import React, { useEffect, useState } from 'react';
import { UserPlus, Footprints, Trophy, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const QuickstartMenu = ({ onClose }) => {
  const [showGroups, setShowGroups] = useState(false);

  const options = [
    { label: 'Create Group', icon: UserPlus, action: () => console.log('Create Group') },
    { label: 'Walk', icon: Footprints, action: () => console.log('Walk') },
    { label: 'Challenge', icon: Trophy, action: () => console.log('Challenge') },
    { label: 'Close', icon: X, action: onClose },
  ];

  const myGroups = [
    { id: 1, name: 'Morning chill', image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66faae0c&is=66f95c8c&hm=3ae40a6ce831ca6992a2655792e403e571651bae6ce97e02ff481af050edf101&' },
    { id: 2, name: 'Climbing bros', image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66faae0c&is=66f95c8c&hm=88ffad286207907d124033282f6a7b23834433bf82fc746a53cc22e8b287f92c&' },
    { id: 3, name: 'Trip', image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66faae0d&is=66f95c8d&hm=9fb35fec57376e16e7ea9b24ecc907d4497951154ee066a727496112edc8a048&' },
  ];

  useEffect(() => {
    document.body.style.setProperty('--status-bar-color', '#FEF8F3');
    document.body.classList.add('dimmed-status-bar');
    return () => {
      document.body.style.removeProperty('--status-bar-color');
      document.body.classList.remove('dimmed-status-bar');
    };
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 },
    }),
  };

  const groupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const groupItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      />
      
      <motion.div
        className="fixed inset-x-0 bottom-20 flex flex-col items-center z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={menuVariants}
      >
        <motion.div className="flex space-x-6 mb-4">
          {options.map((option, index) => (
            <motion.div
              key={index}
              variants={buttonVariants}
              custom={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                onClick={option.action}
              >
                <option.icon className="h-8 w-8" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default QuickstartMenu;

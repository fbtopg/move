import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Eye } from 'lucide-react';

const RefreshEyeIcon = ({ scrollY }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (scrollY > 50) {
      setIsVisible(true);
      controls.start({ opacity: 1, color: '#ffffff' });
    } else {
      controls.start({ opacity: 0, color: '#000000' });
    }

    if (scrollY > 200) {
      controls.start({
        opacity: [1, 0.5, 1],
        color: ['#ffffff', '#808080', '#ffffff'],
        transition: {
          duration: 3,
          repeat: 1,
          repeatType: 'reverse',
        },
      }).then(() => setIsVisible(false));
    }
  }, [scrollY, controls]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      animate={controls}
      initial={{ opacity: 0, color: '#000000' }}
    >
      <Eye className="h-12 w-12" />
    </motion.div>
  );
};

export default RefreshEyeIcon;
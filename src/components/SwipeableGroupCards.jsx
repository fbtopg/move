import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import CommunityGroupCard from './CommunityGroupCard';

const SwipeableGroupCards = ({ groups }) => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            className="flex-[0_0_auto] min-w-0 pl-4 first:pl-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CommunityGroupCard group={group} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SwipeableGroupCards;
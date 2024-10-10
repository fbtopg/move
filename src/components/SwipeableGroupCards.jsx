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
    inViewThreshold: 0.7,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex pl-4">
        {groups.map((group, index) => (
          <motion.div
            key={group.created_at}
            className="flex-[0_0_70%] min-w-0 pr-4 sm:flex-[0_0_40%]"
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
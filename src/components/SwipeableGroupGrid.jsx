import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommunityGroupCard from './CommunityGroupCard';

const SwipeableGroupGrid = ({ groups }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const groupsPerPage = 4;
  const pageCount = Math.ceil(groups.length / groupsPerPage);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (info.offset.x < -100 && currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={currentPage}>
        <motion.div
          key={currentPage}
          custom={currentPage}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {groups.slice(currentPage * groupsPerPage, (currentPage + 1) * groupsPerPage).map((group) => (
            <CommunityGroupCard key={group.id} group={group} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipeableGroupGrid;
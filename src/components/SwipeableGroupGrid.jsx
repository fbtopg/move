import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CommunityGroupCard from './CommunityGroupCard';

const SwipeableGroupGrid = ({ groups }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const groupsPerPage = 4;
  const pageCount = Math.ceil(groups.length / groupsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {groups.slice(currentPage * groupsPerPage, (currentPage + 1) * groupsPerPage).map((group) => (
            <CommunityGroupCard key={group.id} group={group} />
          ))}
        </motion.div>
      </AnimatePresence>
      {pageCount > 1 && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default SwipeableGroupGrid;
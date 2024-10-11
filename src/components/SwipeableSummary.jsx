import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle } from 'lucide-react';

const SwipeableSummary = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goals = [
    { icon: Circle, title: "Today's Goal", description: "Walk 1,000 steps" },
    { icon: Circle, title: "Weekly Challenge", description: "Complete 3 quizzes" }
  ];

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex < goals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-4 mb-6 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              handleSwipe('left');
            } else if (swipe > swipeConfidenceThreshold) {
              handleSwipe('right');
            }
          }}
          className="flex items-center"
        >
          <goals[currentIndex].icon className="w-10 h-10 text-gray-300 mr-4" />
          <div>
            <h2 className="text-xs font-medium text-gray-500">{goals[currentIndex].title}</h2>
            <p className="text-base font-bold text-gray-800">{goals[currentIndex].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {goals.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default SwipeableSummary;
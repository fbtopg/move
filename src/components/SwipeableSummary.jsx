import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

const SwipeableSummary = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goals = [
    { icon: Circle, title: "Today's Goal", description: "Walk 1,000 steps" },
    { icon: Circle, title: "Traveloka", description: "Walk 100,000 steps" },
    { icon: Circle, title: "Monthly Target", description: "Join 2 group activities" }
  ];

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex < goals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative overflow-hidden -mx-4">
      <motion.div
        className="flex"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            handleSwipe('left');
          } else if (swipe > swipeConfidenceThreshold) {
            handleSwipe('right');
          }
        }}
      >
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            className="w-full flex-shrink-0 px-4"
            style={{
              x: `${(index - currentIndex) * 100}%`,
              left: `${index * 100}%`,
              right: `${index * 100}%`,
              position: 'absolute',
            }}
            initial={false}
            animate={{ x: `${(index - currentIndex) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-4 mb-6">
              <div className="flex items-center mb-3">
                {React.createElement(goal.icon, { className: "w-10 h-10 text-gray-300 mr-4" })}
                <div>
                  <h2 className="text-xs font-medium text-gray-500">{goal.title}</h2>
                  <p className="text-base font-bold text-gray-800">{goal.description}</p>
                </div>
              </div>
              <div className="flex justify-center space-x-1">
                {goals.map((_, dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`w-1 h-1 rounded-full ${
                      dotIndex === index ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default SwipeableSummary;
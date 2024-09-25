import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onAnimationComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.img
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Frame%20427319176.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0ZyYW1lIDQyNzMxOTE3Ni5wbmciLCJpYXQiOjE3MjcwNzA4MDcsImV4cCI6MTc1ODYwNjgwN30.j1xZArO1o2zvw7BC4ndlplw90aPpVbbTgG6_-8XrHDE&t=2024-09-23T05%3A53%3A28.124Z"
        alt="Move Logo"
        className="w-24 h-24 object-contain"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 2.5 }}
        transition={{
          duration: 0.5,
          exit: { duration: 0.5, delay: 1.5 },
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;

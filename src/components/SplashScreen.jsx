import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onAnimationComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-[#FEF8F3] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.img
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Frame%20427319177%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0ZyYW1lIDQyNzMxOTE3NyAoMSkucG5nIiwiaWF0IjoxNzI3OTIyMTIxLCJleHAiOjE3NTk0NTgxMjF9.b0B7TbEMMsFUPjDE1HzWFjykB9sMUh2vganwl4zBfJY&t=2024-10-03T02%3A22%3A02.360Z"
        alt="Move Logo"
        className="w-20 h-20 object-contain mb-16"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 10 }}
        transition={{
          duration: 0.5,
          exit: { duration: 0.8, delay: 1.2 },
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;
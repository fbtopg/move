import React from 'react';
import { motion } from 'framer-motion';

const FeatureButton = ({ icon: Icon, label, gradientColors }) => {
  return (
    <motion.button
      className={`w-full p-4 rounded-xl text-white shadow-md flex flex-col items-center justify-center space-y-2 bg-gradient-to-br ${gradientColors}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-8 h-8" />
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

export default FeatureButton;
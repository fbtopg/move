import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <img
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/iPhone%2014%20&%2015%20Pro%20-%2066.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2lQaG9uZSAxNCAmIDE1IFBybyAtIDY2LnBuZyIsImlhdCI6MTcyOTkwNjU3OCwiZXhwIjoxNzYxNDQyNTc4fQ.ygh6wRf24mV1g34_iHxWtv2yH81yS-CVJ9eWY_6L3aY&t=2024-10-26T01%3A36%3A17.426Z"
        alt="Splash Screen"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default SplashScreen;
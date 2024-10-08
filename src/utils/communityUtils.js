import React from 'react';
import { motion } from 'framer-motion';
import FriendActivity from '../components/FriendActivity';

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Good Morning";
  if (currentHour >= 12 && currentHour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const renderActivitySection = (title, activities) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-4 mb-6"
  >
    <h2 className="text-lg font-semibold mb-4 text-gray-800 space-grotesk-title">{title}</h2>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <FriendActivity
            name={activity.name}
            activity={activity.activity}
            type={activity.type}
            profilePicture={activity.profilePicture}
            onUserClick={() => handleUserClick(activity)}
          />
        </motion.div>
      ))}
    </div>
  </motion.div>
);
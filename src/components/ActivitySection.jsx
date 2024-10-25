import React, { useState } from "react";
import { motion } from "framer-motion";
import FriendActivity from "./FriendActivity";

const ActivitySection = ({ activities, onLoginRequired }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { name: 'All', key: 'all', content: 'This is the All tab content.' },
    { name: 'Favorite', key: 'favorite', content: 'These are your favorite items.' },
    { name: 'Me', key: 'me', content: 'This is your profile section.' },
  ];

  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const EmptyState = ({ onLoginRequired }) => (
    <div className="flex flex-col items-center text-center px-4 py-8">
      <h3 className="text-lg font-semibold mb-2">Stay in touch with a swipe</h3>
      <p className="text-sm font-light text-center mb-8">
        Discover your friends' latest moments. Swipe right to like their recent activities and make them feel appreciated.
      </p>
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Group%20289236%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0dyb3VwIDI4OTIzNiAoMSkucG5nIiwiaWF0IjoxNzI5ODM4NjQxLCJleHAiOjE3NjEzNzQ2NDF9.M1tbMZdFCzKb6phePakvCamR9wifQJSLdNIB95bDXEE&t=2024-10-25T06%3A44%3A04.048Z"
        alt="No activities"
        className="w-64 h-auto mb-8"
      />
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white w-full max-w-xs rounded-full py-2"
        onClick={onLoginRequired}
      >
        Get Started
      </button>
    </div>
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Tab Controls */}
      <div className="w-full">
        <div className="relative flex justify-between items-center border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="w-1/3 text-center pb-2 text-sm font-medium text-gray-500 focus:outline-none"
            >
              {tab.name}
            </button>
          ))}

          {/* Thin Gray Bar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></div>

          {/* Sliding Black Underline with Rounded Corners */}
          <div
            className="absolute bottom-[2px] left-0 h-0.5 bg-black rounded-full transition-all duration-300"
            style={{ transform: `translateX(${activeIndex * 100}%)`, width: '33.33%' }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'all' && activities && activities.length > 0 ? (
          activities.map((activity, index) => (
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
              />
            </motion.div>
          ))
        ) : (
          <EmptyState onLoginRequired={onLoginRequired} />
        )}
      </div>
    </div>
  );
};

export default ActivitySection;

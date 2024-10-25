import React, { useState } from "react";
import { motion } from "framer-motion";
import FriendActivity from "./FriendActivity";

const ActivitySection = ({ activities, onLoginRequired }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { name: 'All', key: 'all' },
    { name: 'Favorite', key: 'favorite' },
    { name: 'Me', key: 'me' },
  ];

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return activities && activities.length > 0 ? (
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
        );
      case 'favorite':
        return <EmptyState onLoginRequired={onLoginRequired} />;
      case 'me':
        return <EmptyState onLoginRequired={onLoginRequired} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Tab Controls */}
      <div className="flex justify-around border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab.key
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500'
            } focus:outline-none`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ActivitySection;
import React, { useState } from "react";
import { motion } from "framer-motion";
import FriendActivity from "./FriendActivity";
import { useSupabaseAuth } from '../integrations/supabase/auth';

const ActivitySection = ({ activities }) => {
  const [activeTab, setActiveTab] = useState('all');
  const { session } = useSupabaseAuth();

  const tabs = [
    { name: 'All', key: 'all' },
    { name: 'Favorite', key: 'favorite' },
    { name: 'Me', key: 'me' },
  ];

  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const UnauthenticatedState = () => (
    <div className="flex flex-col items-center text-center py-8">
      <h3 className="text-lg font-semibold mb-2">Join the community</h3>
      <p className="text-sm font-light text-center mb-8">
        Sign in to see what your friends are up to and share your own activities.
      </p>
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Group%20289236%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0dyb3VwIDI4OTIzNiAoMSkucG5nIiwiaWF0IjoxNzI5ODM4NjQxLCJleHAiOjE3NjEzNzQ2NDF9.M1tbMZdFCzKb6phePakvCamR9wifQJSLdNIB95bDXEE&t=2024-10-25T06%3A44%3A04.048Z"
        alt="Sign in to see activities"
        className="w-64 h-auto mb-8"
      />
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center text-center py-8">
      <h3 className="text-lg font-semibold mb-2">Stay in touch with a swipe</h3>
      <p className="text-sm font-light text-center mb-8">
        Discover your friends' latest moments. Swipe right to like their recent activities and make them feel appreciated.
      </p>
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/Group%20289236%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL0dyb3VwIDI4OTIzNiAoMSkucG5nIiwiaWF0IjoxNzI5ODM4NjQxLCJleHAiOjE3NjEzNzQ2NDF9.M1tbMZdFCzKb6phePakvCamR9wifQJSLdNIB95bDXEE&t=2024-10-25T06%3A44%3A04.048Z"
        alt="No activities"
        className="w-64 h-auto mb-8"
      />
      <p className="text-sm text-gray-500">
        No activities yet. Start interacting with your groups to see updates here!
      </p>
    </div>
  );

  return (
    <div className="space-y-4 mb-24">
      <div className="w-full">
        <div className="relative flex justify-between items-center border-b-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-1/3 text-center pb-2 text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'font-medium text-black'
                  : 'font-normal text-gray-500'
              }`}
            >
              {tab.name}
            </button>
          ))}

          <div
            className="absolute bottom-0 left-0 w-full"
            style={{ height: '0.5px', backgroundColor: '#D1D5DB' }}
          ></div>

          <div
            className="absolute bottom-[1px] left-0 h-0.5 bg-black rounded-full transition-all duration-300"
            style={{ transform: `translateX(${activeIndex * 100}%)`, width: '33.33%' }}
          />
        </div>
      </div>

      <div className="p-4">
        {!session ? (
          <UnauthenticatedState />
        ) : (!activities || activities.length === 0) ? (
          <EmptyState />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
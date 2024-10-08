import React from 'react';
import FriendActivity from '../components/FriendActivity';

export const renderActivitySection = (title, activities, handleUserClick) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-4 roboto-medium">{title}</h2>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <FriendActivity
          key={index}
          name={activity.name}
          activity={activity.activity}
          type={activity.type}
          profilePicture={activity.profilePicture}
          onClick={() => handleUserClick(activity)}
        />
      ))}
    </div>
  </div>
);

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
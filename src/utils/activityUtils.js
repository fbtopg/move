import React from 'react';
import FriendActivity from '../components/FriendActivity';
import { getRandomProfilePicture } from './profilePictures';

export const renderActivitySection = (title, activities, onUserClick) => (
  <>
    <h2 className="text-xs font-semibold mb-3 text-gray-400">{title}</h2>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <FriendActivity
          key={index}
          name={activity.name}
          activity={activity.activity}
          type={activity.type}
          profilePicture={Math.random() > 0.3 ? getRandomProfilePicture() : null}
          onUserClick={() => onUserClick(activity)}
        />
      ))}
    </div>
  </>
);
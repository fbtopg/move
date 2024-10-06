import React from 'react';
import { AlertCircle } from 'lucide-react';

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <AlertCircle className="w-12 h-12 text-gray-400 mb-2" />
    <p className="text-sm text-gray-500">{message}</p>
  </div>
);

const GroupInfo = ({ group }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{group.description}</p>
      
      <h3 className="font-semibold">Active Challenges</h3>
      {group.challenges && group.challenges.length > 0 ? (
        <ul className="space-y-2">
          {group.challenges.map(challenge => (
            <li key={challenge.id} className="text-sm">
              {challenge.name} - {challenge.participants} participants
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message="No active challenges" />
      )}

      <h3 className="font-semibold">Recent Activities</h3>
      {group.activities && group.activities.length > 0 ? (
        <ul className="space-y-2">
          {group.activities.map(activity => (
            <li key={activity.id} className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action} - {activity.time}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message="No recent activities" />
      )}
    </div>
  );
};

export default GroupInfo;
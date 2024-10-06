import React from 'react';

const EmptyState = ({ message }) => (
  <p className="text-sm text-gray-500">{message}</p>
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
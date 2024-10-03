import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notification');

  // Sample notifications data
  const notifications = [
    { id: 1, username: 'Emma', action: 'gave you a like', timestamp: '2 minutes ago' },
    { id: 2, username: 'John', action: 'commented on your post', timestamp: '1 hour ago' },
    { id: 3, username: 'Sarah', action: 'shared your activity', timestamp: '3 hours ago' },
    { id: 4, username: 'Mike', action: 'gave you a like', timestamp: '1 day ago' },
    { id: 5, username: 'Lisa', action: 'mentioned you in a comment', timestamp: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-[#FEF8F3] flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>
          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.username}</span>{' '}
                    {notification.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no new notifications.</p>
          )}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Notifications;
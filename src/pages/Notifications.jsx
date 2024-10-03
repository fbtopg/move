import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('notification');
  const navigate = useNavigate();

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
        <div className="max-w-md mx-auto px-4 mt-4">
          <div className="flex flex-col items-end mb-1">
            <Button
              onClick={() => navigate('/profile')}
              className="bg-transparent hover:bg-secondary transition-colors h-10 w-10 rounded-full flex items-center justify-center mb-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z" alt="Profile" />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
            </Button>
            <h1 className="text-2xl font-bold text-foreground self-start">Notifications</h1>
          </div>
          
          <div className="h-px bg-border w-full mt-1 mb-2"></div>
          
          {notifications.length > 0 ? (
            <ul className="space-y-4 mt-6">
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
            <p className="mt-6">You have no new notifications.</p>
          )}
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Notifications;
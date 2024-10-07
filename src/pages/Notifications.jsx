import React from 'react';
import { Bell, Heart, MessageSquare, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'like', username: 'Emma', action: 'liked your post', timestamp: '2m ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, type: 'comment', username: 'John', action: 'commented on your activity', timestamp: '1h ago', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, type: 'like', username: 'Mike', action: 'liked your comment', timestamp: '1d ago', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 4, type: 'follow', username: 'Lisa', action: 'started following you', timestamp: '2d ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 pt-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>
          
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={notification.avatar} alt={notification.username} />
                  <AvatarFallback>{notification.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-sm font-medium">
                    <span className="font-semibold">{notification.username}</span>{' '}
                    {notification.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  {getIcon(notification.type)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomNavBar activeTab="notification" />
    </div>
  );
};

export default Notifications;
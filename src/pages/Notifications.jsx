import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageSquare, Share2, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavBar from '../components/BottomNavBar';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    { id: 1, type: 'like', username: 'Emma', action: 'liked your post', timestamp: '2m ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, type: 'comment', username: 'John', action: 'commented on your activity', timestamp: '1h ago', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, type: 'share', username: 'Sarah', action: 'shared your challenge', timestamp: '3h ago', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, type: 'like', username: 'Mike', action: 'liked your comment', timestamp: '1d ago', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, type: 'follow', username: 'Lisa', action: 'started following you', timestamp: '2d ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'share': return <Share2 className="w-4 h-4 text-green-500" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 pt-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>
          
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
              <TabsTrigger value="like" onClick={() => setActiveTab('like')}>Likes</TabsTrigger>
              <TabsTrigger value="comment" onClick={() => setActiveTab('comment')}>Comments</TabsTrigger>
              <TabsTrigger value="follow" onClick={() => setActiveTab('follow')}>Follows</TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredNotifications.length > 0 ? (
            <motion.ul className="space-y-4">
              {filteredNotifications.map((notification, index) => (
                <motion.li
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-8"
            >
              No notifications in this category.
            </motion.p>
          )}
        </div>
      </div>
      <BottomNavBar activeTab="notification" />
    </div>
  );
};

export default Notifications;
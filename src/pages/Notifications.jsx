import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Trophy, Users, Gift, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', username: 'Benjamin Dizdarevic', action: 'liked your activity!', timestamp: '19 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, type: 'challenge_start', title: 'Daily Step Challenge', action: 'has started!', timestamp: '1d ago' },
    { id: 3, type: 'challenge_end', title: 'Quiz Master Challenge', action: 'has ended. Check your reward!', timestamp: '2d ago' },
    { id: 4, type: 'new_challenge', title: 'Fitness Frenzy', action: 'There is a new challenge', extra: 'available!', timestamp: '3d ago' },
    { id: 5, type: 'achievement', title: 'Step Master', action: 'You\'ve earned a new achievement:', extra: 'Walk 10,000 steps in a day!', timestamp: '4d ago' },
    { id: 6, type: 'friend_join', username: 'Emma Watson', action: 'joined the app!', timestamp: '5d ago', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 7, type: 'group_invite', title: 'Morning Joggers', action: 'You\'ve been invited to join', extra: 'a new group!', timestamp: '1w ago' },
    { id: 8, type: 'reward', title: 'Weekly Bonus', action: 'You\'ve received a reward:', extra: '50 points added!', timestamp: '1w ago' },
  ]);

  useEffect(() => {
    const checkForNewNotification = () => {
      if (Notification.permission === 'granted') {
        const newNotification = {
          id: Date.now(),
          type: 'group_activity',
          username: 'Alex Johnson',
          groupName: 'Fitness Enthusiasts',
          action: 'just completed an activity!',
          extra: 'Give it a like!',
          timestamp: 'Just now',
          avatar: 'https://i.pravatar.cc/150?img=3'
        };
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
      }
    };

    checkForNewNotification();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-6 h-6 text-gray-500" />;
      case 'friend_join':
      case 'group_invite':
        return <Users className="w-6 h-6 text-gray-500" />;
      case 'reward':
        return <Gift className="w-6 h-6 text-gray-500" />;
      case 'group_activity':
        return <Heart className="w-6 h-6 text-gray-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] flex flex-col">
      <header className="sticky top-0 bg-[#FEF8F3] z-10 px-4 py-3 flex items-center">
        <button className="absolute left-4" onClick={handleGoBack}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold w-full text-center">Notifications</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto pt-4">
        <ul>
          {notifications.map((notification, index) => (
            <li key={notification.id} className={`px-4 py-4 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
              <div className="flex items-start space-x-3">
                {notification.type === 'like' || notification.type === 'friend_join' || notification.type === 'group_activity' ? (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.avatar} alt={notification.username} />
                    <AvatarFallback>{notification.username[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {notification.type === 'like' || notification.type === 'friend_join' ? (
                      <><span className="font-semibold">{notification.username}</span> {notification.action}</>
                    ) : notification.type === 'group_activity' ? (
                      <><span className="font-semibold">{notification.username}</span> from <span className="font-semibold">{notification.groupName}</span> {notification.action} {notification.extra}</>
                    ) : (
                      <><span className="font-semibold">{notification.title}</span> {notification.action} {notification.extra}</>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'like', username: 'Benjamin Dizdarevic', action: 'likes your discussion,', content: 'Enjoyed the content!', timestamp: '19 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, type: 'reply', username: 'Benjamin Dizdarevic', action: 'replied on the discussion,', content: 'Enjoyed the content!', timestamp: '19 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 3, type: 'challenge_start', title: 'Daily Walk Challenge', action: 'has started!', timestamp: '1d ago' },
    { id: 4, type: 'challenge_end', title: 'Quiz Master Challenge', action: 'has ended, check your reward!', timestamp: '2d ago' },
    { id: 5, type: 'new_challenge', title: 'Fitness Frenzy', action: 'There is a new challenge upcoming!', timestamp: '3d ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] flex flex-col">
      <header className="sticky top-0 bg-transparent z-10 px-4 py-3 flex items-center">
        <button className="absolute left-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold w-full text-center">Notifications</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        <ul>
          {notifications.map((notification, index) => (
            <li key={notification.id} className={`px-4 py-4 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
              <div className="flex items-start space-x-3">
                {notification.avatar && (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.avatar} alt={notification.username} />
                    <AvatarFallback>{notification.username[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{notification.username} </span>
                    {notification.action} <span className="font-semibold">{notification.content}</span>
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
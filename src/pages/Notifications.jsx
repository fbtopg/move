import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'like', username: 'Benjamin Dizdarevic', action: 'likes your discussion, Enjoyed the content!', timestamp: '19 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, type: 'reply', username: 'Benjamin Dizdarevic', action: 'replied on the discussion, Enjoyed the content!', timestamp: '19 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 3, type: 'challenge_start', title: 'Daily Walk Challenge', action: 'has started!', timestamp: '1d ago' },
    { id: 4, type: 'challenge_end', title: 'Quiz Master Challenge', action: 'has ended, check your reward!', timestamp: '2d ago' },
    { id: 5, type: 'new_challenge', title: 'Fitness Frenzy', action: 'There is a new challenge upcoming!', timestamp: '3d ago' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center border-b">
        <button className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Activity</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li key={notification.id} className="px-4 py-4">
              <div className="flex items-center space-x-3">
                {notification.avatar && (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.avatar} alt={notification.username} />
                    <AvatarFallback>{notification.username[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {notification.username && <span className="font-semibold">{notification.username} </span>}
                    {notification.action}
                  </p>
                  <p className="text-sm text-gray-500">{notification.timestamp}</p>
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
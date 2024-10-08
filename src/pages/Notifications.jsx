import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: 'like', username: 'Benjamin Dizdarevic', action: 'liked your activity!', timestamp: '19 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, type: 'challenge_start', title: 'Daily Step Challenge', action: 'has started!', timestamp: '1d ago' },
    { id: 3, type: 'challenge_end', title: 'Quiz Master Challenge', action: 'has ended. Check your reward!', timestamp: '2d ago' },
    { id: 4, type: 'new_challenge', title: 'Fitness Frenzy', action: 'There is a new challenge', extra: 'available!', timestamp: '3d ago' },
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] flex flex-col">
      <header className="sticky top-0 bg-transparent z-10 px-4 py-3 flex items-center">
        <button className="absolute left-4" onClick={handleGoBack}>
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
                    {notification.type === 'like' && (
                      <><span className="font-semibold">{notification.username}</span> {notification.action}</>
                    )}
                    {notification.type !== 'like' && (
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
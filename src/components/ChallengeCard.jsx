import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ChallengeCard = () => {
  const [notificationStatus, setNotificationStatus] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationStatus('granted');
      }
    }
  }, []);

  const handleNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationStatus('granted');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-8 flex flex-col items-center text-center">
      <img 
        src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/trophy%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL3Ryb3BoeSAoMSkucG5nIiwiaWF0IjoxNzI4MzU0NzQzLCJleHAiOjE3NTk4OTA3NDN9.x8tUTCKqSW8_VGjc0lUo7XQ6M9J9PGMbmLoTDB5rGoc&t=2024-10-08T02%3A32%3A24.480Z"
        alt="Trophy"
        className="w-16 h-16 mb-4"
      />
      <h2 className="text-xl font-bold mb-2">No Challenges</h2>
      <p className="text-sm text-gray-600 mb-4">
        Your current and upcoming challenges will be displayed when they become active.
      </p>
      <Button 
        variant="outline" 
        className="border border-gray-300 text-black hover:bg-gray-100 hover:text-black bg-transparent rounded-full"
        onClick={handleNotificationPermission}
        disabled={notificationStatus === 'granted'}
      >
        {notificationStatus === 'granted' ? "We'll notify you :)" : "Turn on notification"}
      </Button>
    </div>
  );
};

export default ChallengeCard;
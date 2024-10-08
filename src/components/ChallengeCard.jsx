import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ChallengeCard = () => {
  const [notificationStatus, setNotificationStatus] = useState('default');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setNotificationStatus(subscription ? 'granted' : 'default');
        });
      });
    }
  }, []);

  const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const handleNotificationPermission = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array('YOUR_PUBLIC_VAPID_KEY_HERE')
        });
        
        // Send the subscription to your server
        await sendSubscriptionToServer(subscription);
        
        setNotificationStatus('granted');
        sendTestPushNotification();
      } catch (error) {
        console.error('Error subscribing to push notifications:', error);
      }
    }
  };

  const sendSubscriptionToServer = async (subscription) => {
    // Implement the logic to send the subscription to your server
    // This is where you would typically make an API call to your backend
    console.log('Sending subscription to server:', subscription);
  };

  const sendTestPushNotification = async () => {
    // In a real application, this would be triggered from your server
    // This is just a simulation for testing purposes
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.active.postMessage({
        type: 'PUSH_NOTIFICATION',
        title: 'New Group Activity',
        body: 'Alex Johnson from Fitness Enthusiasts just completed an activity! Give it a like!',
        icon: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/etc/trophy%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXRjL3Ryb3BoeSAoMSkucG5nIiwiaWF0IjoxNzI4MzU0NzQzLCJleHAiOjE3NTk4OTA3NDN9.x8tUTCKqSW8_VGjc0lUo7XQ6M9J9PGMbmLoTDB5rGoc&t=2024-10-08T02%3A32%3A24.480Z'
      });
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
        {notificationStatus === 'granted' ? "We'll notify you :)" : "Turn on push notifications"}
      </Button>
    </div>
  );
};

export default ChallengeCard;
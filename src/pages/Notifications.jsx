import React from 'react';
import BottomNavBar from '../components/BottomNavBar';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[#FEF8F3] flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          {/* Add your notifications content here */}
          <p>You have no new notifications.</p>
        </div>
      </div>
      <BottomNavBar activeTab="notification" />
    </div>
  );
};

export default Notifications;
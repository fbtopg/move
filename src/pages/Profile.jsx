import React, { useRef, useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { handleImageUpload } from '../utils/imageUtils';

const Header = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-2xl font-bold mb-6">{greeting}</h1>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const displayName = "James";
  const username = "@username";
  const followers = 57;
  const following = 151;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        // TODO: Update user profile with new image URL
        console.log('New profile picture URL:', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const activeChallenges = [
    { name: "Daily Walk", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailywalkimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHl3YWxraW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU3NjM1MTgsImV4cCI6MTc1NzI5OTUxOH0.GLkQ1VOFZKx98eUHrlNTYxPi7lBaji1GVRee_iUDljs&t=2024-09-08T02%3A45%3A16.927Z", date: "September 2024" },
    { name: "Daily Quiz", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailyquizimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHlxdWl6aW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU2OTAwODIsImV4cCI6MTc1NzIyNjA4Mn0.Pd1SiAgUnY8OeTe7CrOYIzgibXJ2SOPxKPw4SKcKEwU&t=2024-09-07T06%3A21%3A22.177Z", date: "September 2024" },
  ];

  const handleChallengeClick = (challengeName) => {
    if (challengeName === "Daily Walk") {
      navigate('/daily-walk-challenge');
    } else if (challengeName === "Daily Quiz") {
      navigate('/daily-quiz-challenge');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-white hover:bg-transparent"
            >
              <MoreHorizontal className="h-6 w-6 stroke-[1]" />
            </Button>
          </div>
          
          <Header />
          
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-2xl font-light mb-1">{displayName}</p>
              <p className="text-sm text-gray-400">{username}</p>
            </div>
            <Avatar className="w-20 h-20 rounded-full cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z" />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div className="flex mb-12">
            <div className="mr-24 cursor-pointer" onClick={() => navigate('/follow', { state: { initialTab: 'followers' } })}>
              <p className="text-sm text-white uppercase mb-1">Followers</p>
              <p className="text-sm">{followers}</p>
            </div>
            <div className="cursor-pointer" onClick={() => navigate('/follow', { state: { initialTab: 'following' } })}>
              <p className="text-sm text-white uppercase mb-1">Following</p>
              <p className="text-sm">{following}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-sm text-gray-400 uppercase mb-4">ACTIVE</h2>
            <div className="grid grid-cols-1 gap-4">
              {activeChallenges.map((challenge, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between h-12 border border-gray-700 rounded-lg p-2 cursor-pointer"
                  onClick={() => handleChallengeClick(challenge.name)}
                >
                  <div>
                    <p className="text-sm">{challenge.name}</p>
                    <p className="text-xs text-gray-400">{challenge.date}</p>
                  </div>
                  <img src={challenge.image} alt={challenge.name} className="w-8 h-8 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;

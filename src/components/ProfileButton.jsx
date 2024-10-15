import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import LoginPopup from './LoginPopup';

const ProfileButton = () => {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleProfileClick = () => {
    if (session) {
      navigate("/profile");
    } else {
      setShowLoginPopup(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleProfileClick}
        className="bg-white hover:bg-gray-100 transition-colors h-10 w-10 rounded-full flex items-center justify-center p-0 overflow-hidden"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z"
            alt="Profile"
          />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </Button>
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </>
  );
};

export default ProfileButton;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/profile")}
      className="bg-white hover:bg-gray-100 transition-colors h-9 w-9 rounded-full flex items-center justify-center p-0"
    >
      <Avatar className="h-7 w-7">
        <AvatarImage
          src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z"
          alt="Profile"
        />
        <AvatarFallback>PF</AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default ProfileButton;
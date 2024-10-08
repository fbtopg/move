import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';

const CommunityHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-[#FEF8F3] py-4 px-4">
      <div className="w-full flex justify-end space-x-2">
        <Button
          onClick={() => navigate("/notifications")}
          className="bg-white hover:bg-gray-100 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
        >
          <Bell className="h-6 w-6 text-gray-600" /> {/* Increased size from h-5 w-5 to h-6 w-6 */}
        </Button>
        <Button
          onClick={() => navigate("/profile")}
          className="bg-white hover:bg-gray-100 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/pfp/medium.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGZwL21lZGl1bS5wbmciLCJpYXQiOjE3MjU2OTIyMDksImV4cCI6MTc1NzIyODIwOX0.cFZt_zQaj6vJZgVMK7kYXDyIStZQtZzFOHzZFhzJdKA&t=2024-09-07T06%3A56%3A48.637Z"
              alt="Profile"
            />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </div>
  );
};

export default CommunityHeader;
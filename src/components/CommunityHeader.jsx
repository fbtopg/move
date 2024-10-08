import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';
import ProfileButton from './ProfileButton';

const CommunityHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-black py-2 px-4">
      <div className="w-full flex justify-end space-x-2">
        <Button
          onClick={() => navigate("/notifications")}
          className="bg-gray-800 hover:bg-gray-700 transition-colors h-10 w-10 rounded-full flex items-center justify-center p-1.5"
        >
          <Bell className="h-5 w-5 text-white" strokeWidth={1.5} />
        </Button>
        <ProfileButton />
      </div>
    </div>
  );
};

export default CommunityHeader;
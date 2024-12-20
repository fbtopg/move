import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';
import ProfileButton from './ProfileButton';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const MainHeader = ({ openLoginModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useSupabaseAuth();

  const isChallengePage = location.pathname === '/board';

  const handleProfileClick = () => {
    if (session) {
      navigate("/profile");
    } else {
      openLoginModal();
    }
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="sticky top-0 z-10 bg-[#FBFCFC] py-2 px-4">
      <div className="w-full flex justify-end space-x-2">
        {!isChallengePage && session && (
          <Button
            onClick={handleNotificationsClick}
            className="bg-white hover:bg-gray-100 transition-colors h-10 w-10 rounded-full flex items-center justify-center p-1.5"
          >
            <Bell className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
          </Button>
        )}
        <ProfileButton onClick={handleProfileClick} />
      </div>
    </div>
  );
};

export default MainHeader;
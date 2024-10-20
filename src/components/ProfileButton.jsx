import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { User, UserRound } from 'lucide-react';

const ProfileButton = ({ openLoginModal }) => {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const handleProfileClick = () => {
    if (session) {
      navigate("/profile");
    } else {
      if (typeof openLoginModal === 'function') {
        openLoginModal();
      } else {
        console.error('openLoginModal is not a function');
      }
    }
  };

  const userAvatarUrl = session?.user?.user_metadata?.avatar_url;

  return (
    <Button
      onClick={handleProfileClick}
      className="bg-white hover:bg-gray-100 transition-colors h-10 w-10 rounded-full flex items-center justify-center p-0 overflow-hidden"
    >
      {session ? (
        <Avatar className="h-9 w-9">
          {userAvatarUrl ? (
            <AvatarImage src={userAvatarUrl} alt="Profile" />
          ) : (
            <AvatarFallback>
              <User className="h-5 w-5 text-black" />
            </AvatarFallback>
          )}
        </Avatar>
      ) : (
        <UserRound className="h-5 w-5 text-black" />
      )}
    </Button>
  );
};

export default ProfileButton;
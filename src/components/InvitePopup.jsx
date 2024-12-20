import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { toast } from 'sonner';

const InvitePopup = ({ isOpen, onClose, inviterName, groupName, groupImage, groupId, onAccept }) => {
  const { session } = useSupabaseAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const displayName = inviterName?.includes('@') 
    ? inviterName.split('@')[0] 
    : inviterName || 'Someone';

  useEffect(() => {
    // Check if there's a pending invite after login
    const pendingInvite = localStorage.getItem('pendingInvite');
    if (session?.user && pendingInvite) {
      const inviteData = JSON.parse(pendingInvite);
      if (inviteData.groupId === groupId) {
        localStorage.removeItem('pendingInvite');
        onAccept(session.user.id);
      }
    }
  }, [session, groupId, onAccept]);

  const handleAcceptClick = () => {
    if (session?.user) {
      onAccept(session.user.id);
    } else {
      // Store invite info before showing login modal
      localStorage.setItem('pendingInvite', JSON.stringify({
        groupId,
        timestamp: Date.now()
      }));
      setShowLoginModal(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col min-h-screen">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 space-y-6">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src={groupImage} alt={groupName} className="object-cover" />
          <AvatarFallback>{groupName?.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">{groupName}</h2>
          <p className="text-muted-foreground">
            {displayName} has invited you to join this group
          </p>
        </div>
      </div>

      <div className="p-6 pb-safe">
        <Button 
          onClick={handleAcceptClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12"
        >
          Accept
        </Button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default InvitePopup;
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import GoogleLoginButton from './GoogleLoginButton';

const InvitePopup = ({ isOpen, onClose, inviterName, groupName, onAccept }) => {
  // Format inviter name to handle cases where display name is not available
  const displayName = inviterName?.includes('@') 
    ? inviterName.split('@')[0] 
    : inviterName || 'Someone';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col min-h-screen">
      {/* Close button */}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 space-y-6">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src="https://example.com/placeholder.jpg" alt={groupName} className="object-cover" />
          <AvatarFallback>{groupName?.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">{groupName}</h2>
          <p className="text-muted-foreground">
            {displayName} has invited you to join this group
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-6 pb-safe">
        <GoogleLoginButton 
          onClick={onAccept}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12"
        />
      </div>
    </div>
  );
};

export default InvitePopup;
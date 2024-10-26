import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GoogleLoginButton from './GoogleLoginButton';

const InvitePopup = ({ isOpen, onClose, inviterName, groupName, onAccept }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">
            Join Group Invitation
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            {inviterName} has invited you to join {groupName}
          </p>
          <div className="space-y-2">
            <GoogleLoginButton onClick={onAccept} />
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onClose}
            >
              Decline
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePopup;
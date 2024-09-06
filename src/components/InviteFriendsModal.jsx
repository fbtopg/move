import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Share } from "lucide-react";

const InviteFriendsModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <Input
              className="pl-8"
              placeholder="Search username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Add search results here */}
        </div>
        <Button className="w-full" onClick={onClose}>
          <Share className="mr-2 h-4 w-4" /> Invite Friends
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriendsModal;
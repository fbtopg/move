import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, Edit2, Trash2, Trophy } from 'lucide-react';

const GroupMenu = ({ onInvite, onLeaderboard, onEdit, onDelete }) => {
  return (
    <div className="py-4">
      <Button
        variant="ghost"
        className="w-full justify-start text-left mb-2"
        onClick={onInvite}
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Invite Friends
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start text-left mb-2"
        onClick={onLeaderboard}
      >
        <Trophy className="mr-2 h-5 w-5" />
        Leaderboard
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start text-left mb-2"
        onClick={onEdit}
      >
        <Edit2 className="mr-2 h-5 w-5" />
        Edit Group
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start text-left text-red-500"
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-5 w-5" />
        Delete Group
      </Button>
    </div>
  );
};

export default GroupMenu;
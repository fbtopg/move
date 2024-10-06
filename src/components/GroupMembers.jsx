import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';

const GroupMembers = ({ members, onInvite }) => {
  const hasMembers = Array.isArray(members) && members.length > 0;

  if (!hasMembers) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-sm text-gray-500 mb-4">No members in this group yet.</p>
        <Button onClick={onInvite} className="flex items-center">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Members
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {members.map(member => (
        <li key={member.id} className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{member.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default GroupMembers;
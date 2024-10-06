import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Crown } from 'lucide-react';

const GroupMembers = ({ members, currentUser, onInvite }) => {
  const allMembers = [currentUser, ...members].filter(Boolean);

  if (allMembers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-sm text-gray-500 mb-4">No members in this group yet.</p>
        <Button onClick={onInvite} className="flex items-center">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Friends
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-4 mb-4">
        {allMembers.map(member => (
          <li key={member.id} className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{member.name}</span>
            {member.id === currentUser.id && (
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full flex items-center">
                <Crown className="w-3 h-3 mr-1" />
                Owner
              </span>
            )}
            {member.id === currentUser.id && <span className="text-xs text-gray-500">(You)</span>}
          </li>
        ))}
      </ul>
      <Button onClick={onInvite} className="w-full flex items-center justify-center">
        <UserPlus className="mr-2 h-4 w-4" />
        Invite More Friends
      </Button>
    </div>
  );
};

export default GroupMembers;
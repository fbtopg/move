import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupMembers = ({ members }) => {
  // Check if members is an array and has items
  const hasMembers = Array.isArray(members) && members.length > 0;

  return (
    <div>
      {hasMembers ? (
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
      ) : (
        <p>No members to display.</p>
      )}
    </div>
  );
};

export default GroupMembers;
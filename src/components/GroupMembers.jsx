import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupMembers = ({ members }) => {
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
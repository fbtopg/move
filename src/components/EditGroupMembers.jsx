import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EditGroupMembers = ({ members, onRemoveMember }) => {
  return (
    <ul className="space-y-4">
      {members.map(member => (
        <li key={member.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{member.name}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={() => onRemoveMember(member.id)}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default EditGroupMembers;
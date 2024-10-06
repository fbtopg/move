import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from 'lucide-react';

const EditGroupMembers = ({ members, onRemoveMember }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Check if members is an array and has items
  const hasMembers = Array.isArray(members) && members.length > 0;

  const filteredMembers = hasMembers
    ? members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.username && member.username.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10 bg-background"
          placeholder="Search members"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMembers.length > 0 ? (
        <ul className="space-y-4">
          {filteredMembers.map(member => (
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
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
};

export default EditGroupMembers;
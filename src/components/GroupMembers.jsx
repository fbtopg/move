import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share, Crown, Search } from 'lucide-react';

const GroupMembers = ({ members, currentUser, onInvite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ensure members is an array, if not, default to an empty array
  const memberArray = Array.isArray(members) ? members : [];
  const allMembers = [currentUser, ...memberArray].filter(Boolean);

  const filteredMembers = allMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.username && member.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      
      {filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-sm text-gray-500 mb-4">No members found.</p>
          <Button onClick={onInvite} className="flex items-center">
            <Share className="mr-2 h-4 w-4" />
            Share Invite Link
          </Button>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {filteredMembers.map(member => (
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
            <Share className="mr-2 h-4 w-4" />
            Share Invite Link
          </Button>
        </>
      )}
    </div>
  );
};

export default GroupMembers;
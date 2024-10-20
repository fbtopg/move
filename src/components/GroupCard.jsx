import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupCard = ({ group, currentUserId }) => {
  const truncateName = (name) => name.length > 15 ? name.slice(0, 15) + '...' : name;
  const truncateDescription = (desc) => desc && desc.length > 30 ? desc.slice(0, 30) + '...' : desc;

  const isOwner = group.created_by === currentUserId;
  const labelText = isOwner ? 'Owner' : 'Member';

  // Get the first two members' profile pictures
  const memberProfiles = group.members?.slice(0, 2) || [];

  return (
    <div 
      className="relative rounded-lg shadow-md p-2 w-full h-full flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${group.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dimmer overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center mb-1">
          <Avatar className="h-8 w-8 mr-1">
            <AvatarImage src={group.image} alt={group.name} />
            <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-xs font-semibold truncate flex-1 text-white">{truncateName(group.name)}</h3>
        </div>
        <p className="text-xs text-gray-300 mb-1 flex-grow overflow-hidden">
          {truncateDescription(group.description)}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="flex -space-x-1 overflow-hidden">
              {memberProfiles.map((member, index) => (
                <Avatar key={index} className="inline-block h-4 w-4 rounded-full ring-1 ring-black">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name ? member.name.charAt(0) : '?'}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-gray-300 ml-1">{group.member_count || 0}</span>
          </div>
          <span className={`${isOwner ? 'bg-green-500' : 'bg-blue-500'} text-white px-2 py-0.5 rounded-full text-xs`}>
            {labelText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
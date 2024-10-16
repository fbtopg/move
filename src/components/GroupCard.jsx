import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupCard = ({ group, currentUserId }) => {
  const truncateName = (name) => name.length > 20 ? name.slice(0, 20) + '...' : name;
  const truncateDescription = (desc) => desc && desc.length > 50 ? desc.slice(0, 50) + '...' : desc;

  const isOwner = group.created_by === currentUserId;
  const labelText = isOwner ? 'Owner' : 'Member';

  // Get the first three members' profile pictures
  const memberProfiles = group.members?.slice(0, 3) || [];

  return (
    <div 
      className="relative rounded-lg shadow-md p-4 w-full h-full flex flex-col overflow-hidden"
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
        <div className="flex items-center mb-2">
          <Avatar className="h-12 w-12 mr-2">
            <AvatarImage src={group.image} alt={group.name} />
            <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-sm font-semibold truncate flex-1 text-white">{truncateName(group.name)}</h3>
        </div>
        <p className="text-xs text-gray-300 mb-2 flex-grow overflow-hidden">
          {truncateDescription(group.description)}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {memberProfiles.map((member, index) => (
                <Avatar key={index} className="inline-block h-6 w-6 rounded-full ring-2 ring-black">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name ? member.name.charAt(0) : '?'}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-gray-300 ml-2">{group.member_count || 0} members</span>
          </div>
          <span className={`${isOwner ? 'bg-green-500' : 'bg-blue-500'} text-white px-3 py-1 rounded-full text-xs`}>
            {labelText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
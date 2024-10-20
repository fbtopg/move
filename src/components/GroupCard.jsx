import React from 'react';
import { Users } from 'lucide-react';

const GroupCard = ({ group, currentUserId }) => {
  const truncateName = (name) => name.length > 15 ? name.slice(0, 15) + '...' : name;
  const truncateDescription = (desc) => desc && desc.length > 30 ? desc.slice(0, 30) + '...' : desc;

  const isOwner = group.created_by === currentUserId;
  const labelText = isOwner ? 'Owner' : 'Member';

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
        <h3 className="text-base font-semibold truncate text-white mb-1">{truncateName(group.name)}</h3>
        <p className="text-xs text-gray-300 mb-1 flex-grow overflow-hidden">
          {truncateDescription(group.description)}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-white">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-xs">{group.member_count || 0}</span>
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
import React from 'react';
import CommunityGroupCard from './CommunityGroupCard';

const SwipeableGroupGrid = ({ groups }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-4" style={{ width: `${groups.length * 200}px` }}>
        {groups.map((group) => (
          <CommunityGroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default SwipeableGroupGrid;
import React from 'react';
import CommunityGroupCard from './CommunityGroupCard';

const SwipeableGroupGrid = ({ groups }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4">
      <div className="flex px-4" style={{ width: `${groups.length * 200}px` }}>
        {groups.map((group) => (
          <div key={group.id} className="flex-shrink-0 w-48 mr-4">
            <CommunityGroupCard group={group} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwipeableGroupGrid;
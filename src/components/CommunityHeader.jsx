import React from 'react';
import ProfileButton from './ProfileButton';

const CommunityHeader = () => {
  return (
    <div className="sticky top-0 z-10 bg-[#FEF8F3] py-2 px-4">
      <div className="w-full flex justify-end">
        <ProfileButton />
      </div>
    </div>
  );
};

export default CommunityHeader;
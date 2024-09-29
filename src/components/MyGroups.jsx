import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import GroupCard from './GroupCard';
import { getRandomProfilePicture } from '../utils/profilePictures';

const MyGroups = () => {
  const groupsRef = useRef(null);

  const myGroups = [
    { id: 1, name: 'Morning chill', members: 5, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66fa054c&is=66f8b3cc&hm=e90d37ad3b96dd8bd0e80febba1744f732f4fb0f6e23e9c2b4502f49f446e25b&' },
    { id: 2, name: 'Climbing bros', members: 8, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66fa054c&is=66f8b3cc&hm=f08aa4c188ead47c135fa4806063a3d91464afec7975387ce7f541ba100e842a&' },
    { id: 3, name: 'Trip', members: 3, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66fa054d&is=66f8b3cd&hm=c87306c053f5fee8f50fd4acc6363526eba0e50b6547667fd683092e4e032cdc&' },
  ];

  return (
    <div className="mb-6">
      <div className="overflow-x-auto scrollbar-hide -mx-4" ref={groupsRef}>
        <div className="flex space-x-4 px-4" style={{ width: `${myGroups.length * 180}px` }}>
          {myGroups.map((group) => (
            <div key={group.id} className="flex-shrink-0 w-40 h-40">
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
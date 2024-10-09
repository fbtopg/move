import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getRandomProfilePicture } from '../utils/profilePictures';

const GroupCard = ({ group }) => {
  return (
    <div className="flex-shrink-0 w-full h-full rounded-lg overflow-hidden relative bg-[#1a1a1d] p-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 mx-auto">
          <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-semibold text-sm mb-1 truncate">{group.name}</h3>
        <p className="text-xs text-gray-400">{group.members} members</p>
      </div>
    </div>
  );
};

const MyGroups = () => {
  const navigate = useNavigate();
  const groupsRef = useRef(null);

  const myGroups = [
    { id: 1, name: 'Morning chill', members: 5, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66fa054c&is=66f8b3cc&hm=e90d37ad3b96dd8bd0e80febba1744f732f4fb0f6e23e9c2b4502f49f446e25b&', created_at: '2024-03-15T10:00:00Z' },
    { id: 2, name: 'Climbing bros', members: 8, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66fa054c&is=66f8b3cc&hm=f08aa4c188ead47c135fa4806063a3d91464afec7975387ce7f541ba100e842a&', created_at: '2024-03-10T14:30:00Z' },
    { id: 3, name: 'Trip', members: 3, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66fa054d&is=66f8b3cd&hm=c87306c053f5fee8f50fd4acc6363526eba0e50b6547667fd683092e4e032cdc&', created_at: '2024-03-20T09:15:00Z' },
  ];

  // Sort groups by created_at in ascending order (oldest first)
  const sortedGroups = [...myGroups].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return (
    <div className="mb-6">
      <div className="overflow-x-auto scrollbar-hide -mx-4" ref={groupsRef}>
        <div className="flex space-x-4 px-4" style={{ width: `${(sortedGroups.length + 1) * 180}px` }}>
          <div className="flex-shrink-0 w-40 flex flex-col items-center justify-center">
            <Button
              onClick={() => navigate('/my-groups')}
              className="bg-[#212124] text-white rounded-full w-12 h-12 flex items-center justify-center mb-2"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <span className="text-xs text-gray-400">View all</span>
          </div>
          {sortedGroups.map((group) => (
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
import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import { getRandomProfilePicture } from '../utils/profilePictures';

const MyGroups = () => {
  const navigate = useNavigate();

  const myGroups = [
    { id: 1, name: 'My group 1', members: 5, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726000373871/KakaoTalk_20240929_105444000.jpg?ex=66fa054c&is=66f8b3cc&hm=e90d37ad3b96dd8bd0e80febba1744f732f4fb0f6e23e9c2b4502f49f446e25b&', hasActivity: true, lastActivity: 'Just now', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'This is a description for group 1' },
    { id: 2, name: 'My group 2 with a very long name', members: 8, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767726835044392/KakaoTalk_20240929_105444000_01.jpg?ex=66fa054c&is=66f8b3cc&hm=f08aa4c188ead47c135fa4806063a3d91464afec7975387ce7f541ba100e842a&', hasActivity: true, lastActivity: '5m ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'This is a very long description for group 2 that should be truncated' },
    { id: 3, name: 'My group 3', members: 3, image: 'https://cdn.discordapp.com/attachments/1057996608261869689/1289767727749398618/KakaoTalk_20240929_105444000_02.jpg?ex=66fa054d&is=66f8b3cd&hm=c87306c053f5fee8f50fd4acc6363526eba0e50b6547667fd683092e4e032cdc&', hasActivity: true, lastActivity: '2h ago', memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], description: 'Short description' },
  ];

  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Implement group creation logic here
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold mb-6">My Groups</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-40 h-48 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer" onClick={handleCreateGroup}>
            <Plus className="h-8 w-8" />
          </div>
          {myGroups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
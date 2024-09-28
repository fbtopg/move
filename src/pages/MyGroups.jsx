import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GroupCard from '../components/GroupCard';

const MyGroups = () => {
  const navigate = useNavigate();

  const myGroups = [
    { id: 1, name: 'My group 1', members: 5, gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)', hasActivity: true },
    { id: 2, name: 'My group 2', members: 8, gradient: 'linear-gradient(135deg, #FFD93D, #6A5ACD)', hasActivity: true },
    { id: 3, name: 'My group 3', members: 3, gradient: 'linear-gradient(135deg, #FF8C00, #40E0D0)', hasActivity: true },
    { id: 4, name: 'My group 4', members: 6, gradient: 'linear-gradient(135deg, #FF1493, #00CED1)', hasActivity: true },
    { id: 5, name: 'My group 5', members: 4, gradient: 'linear-gradient(135deg, #32CD32, #4169E1)', hasActivity: true },
    { id: 6, name: 'My group 6', members: 7, gradient: 'linear-gradient(135deg, #FF4500, #00FA9A)', hasActivity: true },
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
          <GroupCard
            group={{ name: 'New group', members: 0 }}
            onClick={handleCreateGroup}
            isNewGroup={true}
          />
          {myGroups.map((group) => (
            <GroupCard key={group.id} group={group} hasActivity={group.hasActivity} gradient={group.gradient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { Crown, Users } from 'lucide-react';

const getGradientColor = (index) => {
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-purple-500'
  ];
  return gradients[index % gradients.length];
};

const CommunityGroupCard = ({ group, index }) => {
  const navigate = useNavigate();
  const truncateName = (name) => name.length > 20 ? name.slice(0, 20) + '...' : name;
  const truncateDescription = (desc) => desc.length > 50 ? desc.slice(0, 50) + '...' : desc;

  const handleClick = () => {
    navigate(`/group/${group.id}`, { state: { ...group } });
  };

  return (
    <motion.div
      className="w-full h-64 rounded-xl overflow-hidden relative bg-white shadow-lg cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className={`h-24 bg-gradient-to-r ${getGradientColor(index)} relative`}>
        {group.isOwner && (
          <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
            <Crown className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-40 relative">
        <Avatar className="w-20 h-20 border-4 border-white absolute -top-10 left-4">
          <AvatarImage src={group.image} alt={group.name} className="object-cover" />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-between mb-2 mt-12">
          <h3 className="font-semibold text-lg text-gray-800 truncate">{truncateName(group.name)}</h3>
          {group.hasActivity && (
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{truncateDescription(group.description)}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-1" />
            <p className="text-sm text-gray-500">{group.members} members</p>
          </div>
          <div className="flex -space-x-2">
            {group.memberProfiles.slice(0, 3).map((profile, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                <AvatarImage src={profile} alt={`Member ${index + 1}`} />
                <AvatarFallback>{index + 1}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityGroupCard;
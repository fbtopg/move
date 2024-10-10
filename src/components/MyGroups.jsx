import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';
import CreateGroupModal from './CreateGroupModal';

const GroupCard = ({ group }) => {
  return (
    <div className="flex-shrink-0 w-full h-full rounded-lg overflow-hidden relative bg-[#1a1a1d] p-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 mx-auto">
          <img src={group.image || 'https://via.placeholder.com/160'} alt={group.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-semibold text-sm mb-1 truncate">{group.name}</h3>
        <p className="text-xs text-gray-400">{group.member_count || 0} members</p>
      </div>
    </div>
  );
};

const CreateGroupCard = ({ onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden relative bg-[#1a1a1d] p-4 flex flex-col items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <Plus className="w-12 h-12 text-gray-400 mb-2" />
      <span className="text-sm text-gray-400">Create Group</span>
    </div>
  );
};

const MyGroups = () => {
  const navigate = useNavigate();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['privateGroups'],
    queryFn: fetchPrivateGroups,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading groups</div>;

  // Sort groups by created_at in descending order (newest first)
  const sortedGroups = groups ? [...groups].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  return (
    <div className="mb-6">
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex flex-row space-x-4 px-4" style={{ width: `${Math.max(sortedGroups.length, 1) * 180}px` }}>
          {sortedGroups.length === 0 ? (
            <CreateGroupCard onClick={handleCreateGroup} />
          ) : (
            <>
              {sortedGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  className="flex-shrink-0 w-40 h-40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <GroupCard group={group} />
                </motion.div>
              ))}
              <motion.div
                className="flex-shrink-0 w-40 flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: sortedGroups.length * 0.1 }}
              >
                <Button
                  onClick={() => navigate('/my-groups')}
                  className="bg-[#212124] text-white rounded-full w-12 h-12 flex items-center justify-center mb-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
                <span className="text-xs text-gray-400">View all</span>
              </motion.div>
            </>
          )}
        </div>
      </div>
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
    </div>
  );
};

export default MyGroups;
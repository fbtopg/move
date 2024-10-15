import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';
import GroupCard from './GroupCard';

const MyGroups = () => {
  const navigate = useNavigate();

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['privateGroups'],
    queryFn: fetchPrivateGroups,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading groups</div>;

  const sortedGroups = groups || [];

  const handleCreateGroup = () => {
    // TODO: Implement group creation logic
    console.log("Create new group");
  };

  const CreateGroupCard = () => (
    <motion.div
      className="flex-shrink-0 w-52 h-52 flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={handleCreateGroup}
    >
      <Plus className="w-12 h-12 text-gray-400" />
    </motion.div>
  );

  return (
    <div className="mb-6">
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex flex-row space-x-2 px-4" style={{ width: `${(sortedGroups.length + 2) * 220}px` }}>
          {sortedGroups.length === 0 ? (
            <CreateGroupCard />
          ) : (
            <>
              {sortedGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  className="flex-shrink-0 w-52 h-52"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <GroupCard group={group} />
                </motion.div>
              ))}
              <CreateGroupCard />
            </>
          )}
          <motion.div
            className="flex-shrink-0 w-52 h-52 flex flex-col items-center justify-center"
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
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';
import GroupCard from './GroupCard';
import { Button } from "@/components/ui/button";

const MyGroups = ({ onCreateGroup }) => {
  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['privateGroups'],
    queryFn: fetchPrivateGroups,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading groups</div>;

  const sortedGroups = groups || [];

  const CreateNewGroupCard = () => (
    <motion.div
      className="flex-shrink-0 w-52 h-52 bg-white rounded-lg flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onCreateGroup}
    >
      <Plus className="w-12 h-12 text-gray-400" />
    </motion.div>
  );

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold roboto-medium">My Groups</h2>
        {sortedGroups.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCreateGroup}
            className="p-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex flex-row space-x-2 px-4" style={{ width: `${(sortedGroups.length + 1) * 220}px` }}>
          {sortedGroups.length === 0 ? (
            <CreateNewGroupCard />
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
              <CreateNewGroupCard />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
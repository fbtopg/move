import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/supabase';
import GroupCard from './GroupCard';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const fetchUserGroups = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('groups')
    .eq('id', userId)
    .single();

  if (error) throw error;

  if (!data.groups || data.groups.length === 0) return [];

  const { data: groupsData, error: groupsError } = await supabase
    .from('groups')
    .select('*')
    .in('id', data.groups);

  if (groupsError) throw groupsError;

  return groupsData;
};

const MyGroups = ({ onCreateGroup, onLoginRequired }) => {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const userId = session?.user?.id;

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['userGroups', userId],
    queryFn: () => fetchUserGroups(userId),
    enabled: !!userId,
  });

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  const handleCreateGroupClick = () => {
    if (session) {
      onCreateGroup();
    } else {
      onLoginRequired();
    }
  };

  const CreateNewGroupCard = () => (
    <motion.div
      className="flex-shrink-0 w-52 h-52 bg-white rounded-lg flex flex-col items-center justify-center cursor-pointer p-4 text-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCreateGroupClick}
    >
      <UserPlus className="w-12 h-12 text-gray-400 mb-2" />
      <p className="text-sm text-gray-600">Create a new group and invite friends</p>
    </motion.div>
  );

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-52 h-52 bg-gray-200 rounded-lg animate-pulse">
      <div className="h-32 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold roboto-medium">My Groups</h2>
        {!isLoading && groups && groups.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCreateGroupClick}
            className="p-0"
          >
            <UserPlus className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex flex-row space-x-2 px-4" style={{ width: isLoading ? '440px' : `${((groups?.length || 0) + 1) * 220}px` }}>
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : groups && groups.length > 0 ? (
            <>
              {groups.map((group, index) => (
                <motion.div
                  key={group.id}
                  className="flex-shrink-0 w-52 h-52"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleGroupClick(group.id)}
                >
                  <GroupCard group={group} />
                </motion.div>
              ))}
              <CreateNewGroupCard />
            </>
          ) : (
            <CreateNewGroupCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
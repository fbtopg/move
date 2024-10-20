import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from "lucide-react";
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

  // Sort groups by created_at in descending order (newest first)
  return groupsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
      className="flex-shrink-0 w-40 h-40 bg-white rounded-lg flex flex-col items-center justify-center cursor-pointer p-3 text-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCreateGroupClick}
    >
      <Plus className="w-8 h-8 text-gray-400 mb-2" />
      <p className="text-xs text-gray-600">Create a new group</p>
    </motion.div>
  );

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-40 h-40 bg-gray-200 rounded-lg animate-pulse">
      <div className="h-24 bg-gray-300 rounded-t-lg"></div>
      <div className="p-2">
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="h-2 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
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
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex flex-row space-x-2 px-4" style={{ width: isLoading ? '360px' : `${((groups?.length || 0) + 1) * 180}px` }}>
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
                  className="flex-shrink-0 w-40 h-40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleGroupClick(group.id)}
                >
                  <GroupCard group={group} currentUserId={userId} />
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
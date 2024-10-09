import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPrivateGroups } from '../utils/supabaseGroupUtils';

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

const MyGroups = () => {
  const navigate = useNavigate();

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['privateGroups'],
    queryFn: fetchPrivateGroups,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading groups</div>;

  // Sort groups by created_at in descending order (newest first)
  const sortedGroups = groups ? [...groups].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  }) : [];

  console.log('Original Groups:', groups);
  console.log('Sorted Groups:', sortedGroups.map(g => ({
    id: g.id,
    name: g.name,
    created_at: g.created_at,
    parsed_date: new Date(g.created_at).toISOString()
  })));

  return (
    <div className="mb-6">
      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex flex-row space-x-4 px-4" style={{ width: `${(sortedGroups.length + 1) * 180}px` }}>
          {sortedGroups.map((group, index) => (
            <div key={group.id} className="flex-shrink-0 w-40 h-40" style={{ order: index }}>
              <GroupCard group={group} />
              <div className="text-xs text-gray-500 mt-1">
                Index: {index}, Created: {new Date(group.created_at).toLocaleString()}
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-40 flex flex-col items-center justify-center" style={{ order: sortedGroups.length }}>
            <Button
              onClick={() => navigate('/my-groups')}
              className="bg-[#212124] text-white rounded-full w-12 h-12 flex items-center justify-center mb-2"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <span className="text-xs text-gray-400">View all</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/supabase';

export const useGroupData = (groupId, initialState) => {
  const [group, setGroup] = useState({
    id: groupId,
    name: initialState?.name || 'Loading...',
    image: initialState?.image || 'https://example.com/default-group-image.jpg',
    description: initialState?.description || 'Loading...',
    isPrivate: initialState?.isPrivate || false,
    members: [],
    challenges: [],
    activities: [],
    lastActivity: initialState?.lastActivity || '',
    hasActivity: initialState?.hasActivity || false,
    memberProfiles: initialState?.memberProfiles || [],
    isJoined: initialState?.isJoined ?? true,
    currentUser: {
      id: 'current-user-id',
      name: 'Current User',
      avatar: 'https://example.com/current-user-avatar.jpg'
    }
  });

  const [editedGroup, setEditedGroup] = useState({ ...group });
  const [loading, setLoading] = useState(!initialState);

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!initialState) {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('Group')
            .select('*')
            .eq('id', groupId)
            .single();

          if (error) throw error;

          const updatedGroup = {
            ...group,
            ...data,
            members: data.members || [],
            challenges: data.challenges || [],
            activities: data.activities || [],
            isJoined: data.isJoined ?? true,
          };
          setGroup(updatedGroup);
          setEditedGroup(updatedGroup);
        } catch (error) {
          console.error('Error fetching group data:', error);
          // Handle error (e.g., show error message to user)
        } finally {
          setLoading(false);
        }
      } else {
        const updatedGroup = {
          ...group,
          ...initialState,
          members: initialState.members || [],
          challenges: initialState.challenges || [],
          activities: initialState.activities || [],
          isJoined: initialState.isJoined ?? true,
        };
        setGroup(updatedGroup);
        setEditedGroup(updatedGroup);
      }
    };

    fetchGroupData();
  }, [groupId, initialState]);

  return { group, setGroup, editedGroup, setEditedGroup, loading };
};
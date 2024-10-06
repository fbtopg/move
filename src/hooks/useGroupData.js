import { useState, useEffect } from 'react';

export const useGroupData = (groupId, initialState) => {
  const [group, setGroup] = useState({
    id: groupId,
    name: initialState?.name || 'Loading...',
    image: initialState?.image || 'https://example.com/default-group-image.jpg',
    bannerImage: initialState?.bannerImage || 'linear-gradient(to right, #2193b0, #6dd5ed)',
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

  useEffect(() => {
    if (initialState) {
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
  }, [initialState]);

  return { group, setGroup, editedGroup, setEditedGroup };
};
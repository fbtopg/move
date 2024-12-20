import { supabase } from '../integrations/supabase/supabase';

export const fetchPrivateGroups = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('id, name, description, image, member_count, created_at')
      .or(`created_by.eq.${userId},members.cs.{${userId}}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching private groups:', error);
    throw error;
  }
};

export const fetchGroupDetails = async (groupId) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching group details:', error);
    throw error;
  }
};

const updateUserGroups = async (userId, groupId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('groups')
      .eq('id', userId)
      .single();

    if (error) throw error;

    const updatedGroups = [...(data.groups || []), groupId];

    const { error: updateError } = await supabase
      .from('users')
      .update({ groups: updatedGroups })
      .eq('id', userId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error updating user groups:', error);
    throw error;
  }
};

export const insertNewGroup = async (groupName, userId) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .insert([
        {
          name: groupName,
          description: '',
          image: null,
          is_private: true,
          created_at: new Date().toISOString(),
          created_by: userId,
          member_count: 1,
          members: [userId] // Include the creator as the first member
        }
      ])
      .select();

    if (error) throw error;

    // Update the user's groups
    await updateUserGroups(userId, data[0].id);

    return data[0];
  } catch (error) {
    console.error('Error inserting new group:', error);
    throw error;
  }
};

export const joinGroup = async (groupId, userId) => {
  console.log('Attempting to join group:', { groupId, userId });
  try {
    // First, fetch the current group data
    const { data: groupData, error: fetchError } = await supabase
      .from('groups')
      .select('members, member_count')
      .eq('id', groupId)
      .single();

    if (fetchError) {
      console.error('Error fetching group data:', fetchError);
      throw fetchError;
    }

    console.log('Current group data:', groupData);

    // Check if the user is already a member
    if (groupData.members && groupData.members.includes(userId)) {
      console.log('User is already a member of the group');
      return { alreadyMember: true };
    }

    // Update the group with the new member
    const updatedMembers = [...(groupData.members || []), userId];
    const updatedMemberCount = (groupData.member_count || 0) + 1;

    console.log('Updating group with new member:', {
      updatedMembers,
      updatedMemberCount
    });

    const { data, error } = await supabase
      .from('groups')
      .update({ 
        members: updatedMembers,
        member_count: updatedMemberCount
      })
      .eq('id', groupId)
      .select();

    if (error) {
      console.error('Error updating group:', error);
      throw error;
    }

    console.log('Successfully updated group:', data[0]);

    // Update the user's groups
    await updateUserGroups(userId, groupId);
    console.log('Successfully updated user groups');

    return data[0];
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};

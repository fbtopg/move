import { supabase } from '../integrations/supabase/supabase';

export const generateInviteLink = async (groupId, createdBy) => {
  try {
    const { data, error } = await supabase
      .from('group_invites')
      .insert([{
        group_id: groupId,
        created_by: createdBy,
      }])
      .select()
      .single();

    if (error) throw error;

    const inviteLink = `${window.location.origin}/invite/${data.invite_code}`;
    return inviteLink;
  } catch (error) {
    console.error('Error generating invite link:', error);
    throw error;
  }
};

export const getInviteDetails = async (inviteCode) => {
  try {
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites')
      .select(`
        *,
        groups:group_id (
          name,
          created_by
        )
      `)
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError) throw inviteError;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', inviteData.created_by)
      .single();

    if (userError) throw userError;

    return {
      groupName: inviteData.groups.name,
      inviterName: userData.username,
      groupId: inviteData.group_id
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
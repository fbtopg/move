import { supabase } from '../integrations/supabase/supabase';

export const generateInviteLink = async (groupId, createdBy) => {
  try {
    const { data, error } = await supabase
      .from('invitations')
      .insert([{
        group_id: groupId,
        sender_id: createdBy,
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
    // First check if invite exists and is valid
    const { data: inviteData, error: inviteError } = await supabase
      .from('invitations')
      .select(`
        *,
        groups:group_id (
          name,
          description,
          created_by
        )
      `)
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError) {
      console.error('Invite error:', inviteError);
      throw new Error('Invalid invitation');
    }

    if (!inviteData || !inviteData.groups) {
      throw new Error('Invalid invitation');
    }

    // Check if invite has expired
    const now = new Date();
    const expiryDate = new Date(inviteData.expires_at);
    if (now > expiryDate) {
      throw new Error('Invitation has expired');
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', inviteData.sender_id)
      .single();

    // Even if we can't get the inviter's name, we still want to show the group info
    const inviterName = userError ? 'Someone' : userData.username;

    return {
      groupName: inviteData.groups.name,
      groupDescription: inviteData.groups.description,
      inviterName,
      groupId: inviteData.group_id,
      isValid: true
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
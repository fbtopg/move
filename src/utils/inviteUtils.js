import { supabase } from '../integrations/supabase/supabase';

export const generateInviteLink = async (groupId, createdBy) => {
  try {
    const { data, error } = await supabase
      .from('group_invites')
      .insert([{
        group_id: groupId,
        created_by: createdBy,
        max_uses: 100,
        is_active: true
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
    // First fetch the invite data
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites')
      .select('*, group:group_id(*), creator:created_by(*)')
      .eq('invite_code', inviteCode)
      .maybeSingle();

    if (inviteError || !inviteData) {
      console.error('Error fetching invite:', inviteError);
      throw new Error('Invalid invitation');
    }

    // Check if invite has expired
    const now = new Date();
    const expiryDate = new Date(inviteData.expires_at);
    if (now > expiryDate || !inviteData.is_active) {
      throw new Error('Invitation has expired');
    }

    // Check if max uses reached
    if (inviteData.uses >= inviteData.max_uses) {
      throw new Error('Invitation has reached maximum uses');
    }

    return {
      groupId: inviteData.group_id,
      groupName: inviteData.group?.name || 'Unknown Group',
      groupDescription: inviteData.group?.description || '',
      inviterName: inviteData.creator?.email || 'Someone',
      isValid: true
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
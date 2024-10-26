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
    // First, get just the invite data
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites')
      .select('id, group_id, created_by, uses, max_uses, expires_at, is_active')
      .eq('invite_code', inviteCode)
      .maybeSingle();

    if (inviteError || !inviteData) {
      throw new Error('Invalid invitation');
    }

    // Then get the group details
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select('name, description')
      .eq('id', inviteData.group_id)
      .maybeSingle();

    if (groupError || !groupData) {
      throw new Error('Invalid invitation');
    }

    // Get creator details
    const { data: creatorData } = await supabase
      .from('users')
      .select('email')
      .eq('id', inviteData.created_by)
      .maybeSingle();

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
      groupName: groupData.name,
      groupDescription: groupData.description,
      inviterName: creatorData?.email || 'Someone',
      isValid: true
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
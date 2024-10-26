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
    // Get the invite data with a direct query
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites')
      .select('id, group_id, created_by, uses, max_uses, expires_at, is_active')
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError || !inviteData) {
      console.error('Error fetching invite:', inviteError);
      throw new Error('Invalid invitation');
    }

    // Get group details
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select('name, description, created_by')
      .eq('id', inviteData.group_id)
      .single();

    if (groupError || !groupData) {
      console.error('Error fetching group:', groupError);
      throw new Error('Invalid invitation');
    }

    // Get creator details from profiles table
    const { data: creatorData, error: creatorError } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', inviteData.created_by)
      .single();

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
      inviterName: creatorData?.full_name || creatorData?.email || 'Someone',
      isValid: true
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
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
    console.log('Fetching invite details for code:', inviteCode);
    
    // First, get the invite data
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites')
      .select('*, group_id')
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError) {
      console.error('Database error when fetching invite:', inviteError);
      throw new Error('Invalid invitation');
    }

    if (!inviteData) {
      console.error('No invite data found');
      throw new Error('Invalid invitation');
    }

    // Then, get the group details separately
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select('name, description, created_by')
      .eq('id', inviteData.group_id)
      .single();

    if (groupError) {
      console.error('Error fetching group details:', groupError);
      throw new Error('Invalid invitation');
    }

    // Get creator details
    const { data: creatorData, error: creatorError } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', groupData.created_by)
      .single();

    if (creatorError) {
      console.error('Error fetching creator details:', creatorError);
      // Don't throw here, we can still proceed with limited information
    }

    // Check if invite has expired
    const now = new Date();
    const expiryDate = new Date(inviteData.expires_at);
    if (now > expiryDate) {
      console.error('Invite expired:', {
        now: now.toISOString(),
        expiryDate: inviteData.expires_at,
      });
      throw new Error('Invitation has expired');
    }

    // Check if max uses reached
    if (inviteData.uses >= inviteData.max_uses) {
      console.error('Max uses reached:', {
        currentUses: inviteData.uses,
        maxUses: inviteData.max_uses,
      });
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
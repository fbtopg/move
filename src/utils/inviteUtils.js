import { supabase } from '../integrations/supabase/supabase';

export const generateInviteLink = async (groupId, createdBy) => {
  console.log('Generating invite link:', { groupId, createdBy });
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

    if (error) {
      console.error('Error generating invite:', error);
      throw error;
    }

    console.log('Invite created successfully:', data);
    const inviteLink = `${window.location.origin}/invite/${data.invite_code}`;
    return inviteLink;
  } catch (error) {
    console.error('Error generating invite link:', error);
    throw error;
  }
};

export const getInviteDetails = async (inviteCode) => {
  console.log('Fetching invite details for code:', inviteCode);
  try {
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites_with_details')
      .select('*')
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError) {
      console.error('Error fetching invite:', inviteError);
      throw new Error('Invalid invitation');
    }

    if (!inviteData) {
      console.error('No invite found for code:', inviteCode);
      throw new Error('Invitation not found');
    }

    console.log('Invite details retrieved:', inviteData);

    // Check if invite has expired
    const now = new Date();
    const expiryDate = new Date(inviteData.expires_at);
    if (now > expiryDate || !inviteData.is_active) {
      console.error('Invite expired or inactive:', { expiryDate, isActive: inviteData.is_active });
      throw new Error('Invitation has expired');
    }

    // Check if max uses reached
    if (inviteData.uses >= inviteData.max_uses) {
      console.error('Max uses reached:', { uses: inviteData.uses, maxUses: inviteData.max_uses });
      throw new Error('Invitation has reached maximum uses');
    }

    console.log('Invite is valid and active');
    return {
      groupId: inviteData.group_id,
      groupName: inviteData.group_name || 'Unknown Group',
      groupDescription: inviteData.group_description || '',
      groupImage: inviteData.group_image || null,
      inviterName: inviteData.inviter_display_name || inviteData.inviter_email || 'Someone',
      isValid: true
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
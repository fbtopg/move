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
    
    const { data: inviteData, error: inviteError } = await supabase
      .from('group_invites')
      .select(`
        *,
        groups:group_id (
          name,
          description,
          created_by
        ),
        creator:created_by (
          username,
          full_name
        )
      `)
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError) {
      console.error('Database error when fetching invite:', inviteError);
      throw new Error('Invalid invitation');
    }

    if (!inviteData || !inviteData.groups) {
      console.error('No invite data found or group does not exist:', { inviteData });
      throw new Error('Invalid invitation');
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

    console.log('Valid invite details found:', {
      groupId: inviteData.group_id,
      groupName: inviteData.groups.name,
      inviter: inviteData.creator?.username || inviteData.creator?.full_name,
    });

    return {
      groupId: inviteData.group_id,
      groupName: inviteData.groups.name,
      groupDescription: inviteData.groups.description,
      inviterName: inviteData.creator?.username || inviteData.creator?.full_name || 'Someone',
      isValid: true
    };
  } catch (error) {
    console.error('Error getting invite details:', error);
    throw error;
  }
};
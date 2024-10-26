import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { getInviteDetails } from '../utils/inviteUtils';
import InvitePopup from '../components/InvitePopup';
import { joinGroup } from '../utils/supabaseGroupUtils';
import { toast } from 'sonner';

const InvitePage = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const [inviteDetails, setInviteDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchInviteDetails = async () => {
      try {
        const details = await getInviteDetails(inviteCode);
        setInviteDetails(details);
        if (!session) {
          setShowPopup(true);
        } else {
          handleJoinGroup(details.groupId);
        }
      } catch (error) {
        toast.error('Invalid or expired invitation');
        navigate('/');
      }
    };

    if (inviteCode) {
      fetchInviteDetails();
    }
  }, [inviteCode, session]);

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId, session.user.id);
      toast.success('Successfully joined the group!');
      navigate(`/group/${groupId}`);
    } catch (error) {
      toast.error('Failed to join the group');
      navigate('/');
    }
  };

  const handleAccept = async () => {
    setShowPopup(false);
    // The user will be redirected to sign in
    // After signing in, they'll be brought back to this page
    // and the useEffect will handle joining the group
  };

  if (!inviteDetails) {
    return null;
  }

  return (
    <div>
      <InvitePopup
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          navigate('/');
        }}
        inviterName={inviteDetails.inviterName}
        groupName={inviteDetails.groupName}
        onAccept={handleAccept}
      />
    </div>
  );
};

export default InvitePage;
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
  const [isLoading, setIsLoading] = useState(true);
  const [pendingJoin, setPendingJoin] = useState(false);

  // Fetch invite details
  useEffect(() => {
    const fetchInviteDetails = async () => {
      if (!inviteCode) {
        navigate('/');
        return;
      }

      setIsLoading(true);
      try {
        const details = await getInviteDetails(inviteCode);
        setInviteDetails(details);
        setShowPopup(true);
      } catch (error) {
        console.error('Error with invitation:', error);
        toast.error(error.message || 'Invalid or expired invitation');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInviteDetails();
  }, [inviteCode, navigate]);

  // Handle automatic join after login
  useEffect(() => {
    const handlePostLoginJoin = async () => {
      if (session?.user?.id && pendingJoin && inviteDetails?.groupId) {
        try {
          await joinGroup(inviteDetails.groupId, session.user.id);
          toast.success('Successfully joined the group!');
          navigate(`/group/${inviteDetails.groupId}`);
        } catch (error) {
          console.error('Error joining group:', error);
          toast.error('Failed to join the group');
          navigate('/');
        }
        setPendingJoin(false);
      }
    };

    handlePostLoginJoin();
  }, [session, pendingJoin, inviteDetails, navigate]);

  if (isLoading || !inviteDetails) {
    return null;
  }

  return (
    <InvitePopup
      isOpen={showPopup}
      onClose={() => {
        setShowPopup(false);
        navigate('/');
      }}
      inviterName={inviteDetails.inviterName}
      groupName={inviteDetails.groupName}
      groupImage={inviteDetails.groupImage}
      groupId={inviteDetails.groupId}
      setPendingJoin={setPendingJoin}
    />
  );
};

export default InvitePage;
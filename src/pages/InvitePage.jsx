import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { getInviteDetails } from '../utils/inviteUtils';
import InvitePopup from '../components/InvitePopup';
import { joinGroup } from '../utils/supabaseGroupUtils';
import { toast } from 'sonner';

const PENDING_INVITE_KEY = 'pendingInvite';

const InvitePage = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const [inviteDetails, setInviteDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingJoin, setPendingJoin] = useState(false);

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

        sessionStorage.setItem(PENDING_INVITE_KEY, JSON.stringify({
          inviteCode,
          details
        }));
      } catch (error) {
        console.error('Error with invitation:', error);
        toast.error(error.message || 'Invalid or expired invitation');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    const storedInvite = sessionStorage.getItem(PENDING_INVITE_KEY);
    if (storedInvite) {
      const { inviteCode: storedCode, details } = JSON.parse(storedInvite);
      if (storedCode === inviteCode) {
        setInviteDetails(details);
        setShowPopup(true);
        setPendingJoin(true);
        setIsLoading(false);
      } else {
        fetchInviteDetails();
      }
    } else {
      fetchInviteDetails();
    }
  }, [inviteCode, navigate]);

  useEffect(() => {
    const handlePostLoginJoin = async () => {
      const storedInvite = sessionStorage.getItem(PENDING_INVITE_KEY);

      if (!storedInvite) {
        console.warn('No pending invite found in sessionStorage.');
        return;
      }

      const { details } = JSON.parse(storedInvite);

      if (session?.user?.id && details) {
        console.log('Attempting post-login join:', { 
          userId: session.user.id, 
          groupId: details.groupId 
        });

        try {
          const result = await joinGroup(details.groupId, session.user.id);
          console.log('Join group result:', result);

          if (result?.alreadyMember) {
            toast.info('You are already a member of this group.');
          } else {
            toast.success('Successfully joined the group!');
          }

          sessionStorage.removeItem(PENDING_INVITE_KEY);
          navigate(`/group/${details.groupId}`);
        } catch (error) {
          console.error('Error joining group after login:', error);
          toast.error('Failed to join the group.');
          navigate('/');
        }
      } else {
        console.warn('User session or invite details not available.');
      }
    };

    handlePostLoginJoin();
  }, [session, navigate]);

  if (isLoading || !inviteDetails) {
    return null;
  }

  return (
    <InvitePopup
      isOpen={showPopup}
      onClose={() => {
        setShowPopup(false);
        sessionStorage.removeItem(PENDING_INVITE_KEY);
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
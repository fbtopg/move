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

        // Store invite details in localStorage when fetched
        localStorage.setItem(PENDING_INVITE_KEY, JSON.stringify({
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

    // Check if there's a pending invite in localStorage
    const storedInvite = localStorage.getItem(PENDING_INVITE_KEY);
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

  // Handle automatic join after login
  useEffect(() => {
    const handlePostLoginJoin = async () => {
      const storedInvite = localStorage.getItem(PENDING_INVITE_KEY);
      if (session?.user?.id && storedInvite) {
        const { details } = JSON.parse(storedInvite);
        try {
          console.log('Attempting post-login join:', { 
            userId: session.user.id, 
            groupId: details.groupId 
          });
          
          await joinGroup(details.groupId, session.user.id);
          toast.success('Successfully joined the group!');
          navigate(`/group/${details.groupId}`);
          
          // Clear the stored invite after successful join
          localStorage.removeItem(PENDING_INVITE_KEY);
        } catch (error) {
          console.error('Error joining group after login:', error);
          toast.error('Failed to join the group');
          navigate('/');
        }
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
        localStorage.removeItem(PENDING_INVITE_KEY);
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
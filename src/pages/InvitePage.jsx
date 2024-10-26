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
        
        if (session) {
          handleJoinGroup(details.groupId);
        } else {
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error with invitation:', error);
        toast.error(error.message || 'Invalid or expired invitation');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInviteDetails();
  }, [inviteCode, session, navigate]);

  const handleJoinGroup = async (groupId) => {
    if (!session) {
      setShowPopup(true);
      return;
    }

    try {
      await joinGroup(groupId, session.user.id);
      toast.success('Successfully joined the group!');
      navigate(`/group/${groupId}`);
    } catch (error) {
      console.error('Error joining group:', error);
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

  if (isLoading) {
    return null; // or a loading spinner
  }

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
        groupImage={inviteDetails.groupImage}
        onAccept={handleAccept}
      />
    </div>
  );
};

export default InvitePage;
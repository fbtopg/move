export const shareInvite = async (groupName = '') => {
  const shareUrl = 'https://terima.gptengineer.run/';
  const shareTitle = "Terima - connect with your friends";
  const shareText = `Join my group "${groupName}" on Terima and let's get active together!`;
  const shareImage = "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/app/applogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXBwL2FwcGxvZ28ucG5nIiwiaWF0IjoxNzI1Njk0NzAxLCJleHAiOjE3NTcyMzA3MDF9.s7cEAMNw4ZGNohLSIXJYCqqPmNSn6xyIYMmEVArTWVk&t=2024-09-07T07%3A38%3A21.315Z";
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      console.log('Content shared successfully');
    } catch (err) {
      console.error('Error sharing:', err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}\n\n${shareUrl}\n\nImage: ${shareImage}`);
      alert('Invitation text, link, and image URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }
};
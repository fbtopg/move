import { shareInvite } from './shareUtils';

export const initialGroupData = {
  name: '',
  image: null,
  description: '',
  isPrivate: false
};

export const validateForm = (groupData) => {
  const errors = {};
  if (!groupData.name.trim()) errors.name = 'Group name is required';
  if (!groupData.image) errors.image = 'Group image is required';
  return errors;
};

export const handleConfirmation = (onClose) => {
  console.log('Group creation confirmed');
  onClose();
};

export const renderConfirmationStep = (groupData, onClose) => (
  <div className="text-center">
    <h3 className="text-xl font-semibold mb-4">Group Created Successfully!</h3>
    <div className="mb-4">
      {groupData.image && (
        <img src={groupData.image} alt="Group" className="w-32 h-32 rounded-full mx-auto mb-2" />
      )}
      <p className="font-medium">{groupData.name}</p>
    </div>
    <Button 
      onClick={shareInvite}
      className="w-full mb-4"
    >
      Share Invite Link <Share className="ml-2 h-4 w-4" />
    </Button>
    <Button 
      onClick={() => handleConfirmation(onClose)}
      className="w-full"
    >
      Done
    </Button>
  </div>
);
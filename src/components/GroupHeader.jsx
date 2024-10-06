import React from 'react';
import { ArrowLeft, MoreVertical, Share, Check, UserPlus, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GroupMenu from './GroupMenu';
import InlineImageEdit from './InlineImageEdit';

const getGradientColor = (index) => {
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-purple-500'
  ];
  return gradients[index % gradients.length];
};

const GroupHeader = ({ group, isEditing, onEdit, onSave, onCancel, onBack, onInvite, onDelete, onLeaderboard, onJoin, onShare, onInputChange }) => {
  const gradientClass = getGradientColor(group.id);

  const renderActionButtons = () => {
    if (isEditing) return <EditingActions onSave={onSave} />;
    if (!group.isJoined) return <NonMemberActions onShare={onShare} onJoin={onJoin} />;
    return <MemberActions onInvite={onInvite} onEdit={onEdit} onDelete={onDelete} onLeaderboard={onLeaderboard} />;
  };

  return (
    <div className="relative h-48">
      <BannerImage
        isEditing={isEditing}
        bannerImage={group.bannerImage}
        gradientClass={gradientClass}
        onInputChange={onInputChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
        onClick={isEditing ? onCancel : onBack}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      {renderActionButtons()}
      <GroupAvatar
        isEditing={isEditing}
        image={group.image}
        name={group.name}
        onInputChange={onInputChange}
      />
    </div>
  );
};

const BannerImage = ({ isEditing, bannerImage, gradientClass, onInputChange }) => (
  <div className={`absolute inset-0 ${bannerImage ? '' : `bg-gradient-to-r ${gradientClass}`}`}>
    {bannerImage && <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />}
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    {isEditing && (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-16 bg-black/50 text-white rounded-full"
        onClick={() => document.getElementById('banner-upload').click()}
      >
        <Camera className="h-6 w-6" />
      </Button>
    )}
    <input
      id="banner-upload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onInputChange({ target: { name: 'bannerImage', value: e.target.files[0] } })}
    />
  </div>
);

const GroupAvatar = ({ isEditing, image, name, onInputChange }) => (
  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
    {isEditing ? (
      <InlineImageEdit
        currentImage={image}
        onImageChange={(file) => onInputChange({ target: { name: 'image', value: file } })}
        className="w-32 h-32 rounded-full"
      />
    ) : (
      <Avatar className="w-32 h-32 border-4 border-background">
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
    )}
  </div>
);

const EditingActions = ({ onSave }) => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
    onClick={onSave}
  >
    <Check className="h-6 w-6" />
  </Button>
);

const NonMemberActions = ({ onShare, onJoin }) => (
  <div className="absolute top-4 right-4 flex space-x-2">
    <Button
      variant="ghost"
      size="icon"
      className="bg-black/50 text-white rounded-full"
      onClick={onShare}
    >
      <Share className="h-6 w-6" />
    </Button>
    <Button
      variant="primary"
      className="bg-[#3B72EC] hover:bg-[#3B72EC]/90 text-white rounded-full"
      onClick={onJoin}
    >
      Join
    </Button>
  </div>
);

const MemberActions = ({ onInvite, onEdit, onDelete, onLeaderboard }) => (
  <div className="absolute top-4 right-4 flex space-x-2">
    <Button
      variant="ghost"
      size="icon"
      className="bg-black/50 text-white rounded-full"
      onClick={onInvite}
    >
      <UserPlus className="h-6 w-6" />
    </Button>
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white rounded-full"
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto rounded-t-3xl">
        <GroupMenu onInvite={onInvite} onLeaderboard={onLeaderboard} onEdit={onEdit} onDelete={onDelete} />
      </SheetContent>
    </Sheet>
  </div>
);

export default GroupHeader;
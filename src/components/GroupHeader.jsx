import React from 'react';
import { ArrowLeft, MoreVertical, Share, Check, UserPlus } from 'lucide-react';
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
  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
          onClick={onSave}
        >
          <Check className="h-6 w-6" />
        </Button>
      );
    }

    if (!group.isJoined) {
      return (
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
    }

    return (
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
  };

  const gradientClass = getGradientColor(group.id);

  return (
    <div className="relative h-48">
      {isEditing ? (
        <InlineImageEdit
          currentImage={group.bannerImage}
          onImageChange={(file) => onInputChange({ target: { name: 'bannerImage', value: file } })}
          className="absolute inset-0"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass}`}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
        onClick={isEditing ? onCancel : onBack}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      {renderActionButtons()}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        {isEditing ? (
          <InlineImageEdit
            currentImage={group.image}
            onImageChange={(file) => onInputChange({ target: { name: 'image', value: file } })}
            className="w-32 h-32 rounded-full"
          />
        ) : (
          <Avatar className="w-32 h-32 border-4 border-background">
            <AvatarImage src={group.image} alt={group.name} className="object-cover" />
            <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default GroupHeader;
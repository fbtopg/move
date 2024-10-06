import React from 'react';
import { ArrowLeft, MoreVertical, Share, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GroupMenu from './GroupMenu';
import InlineImageEdit from './InlineImageEdit';
import { Input } from "@/components/ui/input";

const GroupHeader = ({ group, onInputChange, onImageChange, onBack, onInvite, onDelete, onLeaderboard, onJoin, onShare }) => {
  const renderActionButtons = () => {
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
            <GroupMenu onInvite={onInvite} onLeaderboard={onLeaderboard} onDelete={onDelete} />
          </SheetContent>
        </Sheet>
      </div>
    );
  };

  return (
    <div className="relative h-48">
      <InlineImageEdit
        currentImage={group.bannerImage}
        onImageChange={(file) => onImageChange('bannerImage', file)}
        className="absolute inset-0"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
        onClick={onBack}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      {renderActionButtons()}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <InlineImageEdit
          currentImage={group.image}
          onImageChange={(file) => onImageChange('image', file)}
          className="w-32 h-32 rounded-full border-4 border-background"
        />
      </div>
      <Input
        value={group.name}
        onChange={(e) => onInputChange('name', e.target.value)}
        className="absolute bottom-4 left-4 right-4 bg-transparent text-white text-2xl font-bold border-none focus:ring-0"
      />
    </div>
  );
};

export default GroupHeader;
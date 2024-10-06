import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, UserPlus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const GroupHeader = ({ group, isEditing, onEdit, onSave, onCancel, onBack, onInvite, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative h-48">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: group.bannerImage.startsWith('http') ? `url(${group.bannerImage})` : group.bannerImage }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      {isEditing ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
            onClick={onCancel}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
            onClick={onSave}
          >
            <Check className="h-6 w-6" />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full"
              >
                <MoreVertical className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-3xl">
              <div className="py-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left mb-2"
                  onClick={() => { onInvite(); setIsMenuOpen(false); }}
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Invite Friends
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left mb-2"
                  onClick={() => { onEdit(); setIsMenuOpen(false); }}
                >
                  <Edit2 className="mr-2 h-5 w-5" />
                  Edit Group
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-red-500"
                  onClick={() => { onDelete(); setIsMenuOpen(false); }}
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete Group
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src={group.image} alt={group.name} />
          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default GroupHeader;
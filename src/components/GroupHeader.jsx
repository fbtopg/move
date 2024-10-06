import React from 'react';
import { ArrowLeft, MoreVertical, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const GroupHeader = ({ group, isEditing, onEdit, onSave, onCancel, onBack, onInvite, onDelete, isDiscoverable }) => {
  return (
    <div className="relative">
      <div
        className="h-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${group.bannerImage})`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>
        {!isDiscoverable && (
          isEditing ? (
            <div>
              <Button variant="ghost" onClick={onCancel} className="mr-2 text-white">
                Cancel
              </Button>
              <Button variant="ghost" onClick={onSave} className="text-white">
                Save
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-6 w-6 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>Edit Group</DropdownMenuItem>
                <DropdownMenuItem onClick={onInvite}>Invite Members</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  Delete Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        )}
      </div>
    </div>
  );
};

export default GroupHeader;
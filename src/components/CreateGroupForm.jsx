import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Lock, Globe } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CreateGroupForm = ({ handleCreateGroup }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    capacity: 'unlimited',
    image: null
  });
  const [selectedCapacity, setSelectedCapacity] = useState('∞');
  const capacityRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrivacyChange = (value) => {
    setGroupData(prev => ({ ...prev, isPrivate: value === 'private' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapacityChange = (capacity) => {
    setSelectedCapacity(capacity);
    setGroupData(prev => ({ ...prev, capacity: capacity === '∞' ? 'unlimited' : capacity }));
  };

  const isFormValid = groupData.name.trim() !== '';

  const capacityOptions = ['∞', ...Array.from({ length: 99 }, (_, i) => (i + 2).toString())];

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) handleCreateGroup(groupData); }} className="space-y-6">
      <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-40 mb-6">
        {groupData.image ? (
          <img src={groupData.image} alt="Group" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <label htmlFor="groupImageUpload" className="cursor-pointer flex flex-col items-center">
            <div className="bg-background rounded-full p-3 mb-2">
              <Image className="h-8 w-8 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Add group image</span>
          </label>
        )}
        <input
          id="groupImageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <Input
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleInputChange}
        className="w-full text-lg"
      />

      <Textarea
        name="description"
        placeholder="Description (optional)"
        value={groupData.description}
        onChange={handleInputChange}
        rows={3}
        className="w-full resize-none"
      />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>{groupData.isPrivate ? 'Private' : 'Public'}</span>
            {groupData.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[30vh]">
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">Group Visibility</h3>
            <Button
              variant={groupData.isPrivate ? "outline" : "default"}
              className="w-full justify-start"
              onClick={() => handlePrivacyChange('public')}
            >
              <Globe className="mr-2 h-4 w-4" />
              Public
            </Button>
            <Button
              variant={groupData.isPrivate ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handlePrivacyChange('private')}
            >
              <Lock className="mr-2 h-4 w-4" />
              Private
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Group Capacity</h3>
        <div className="relative -mx-4 px-4">
          <div 
            ref={capacityRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {capacityOptions.map((capacity) => (
              <div
                key={capacity}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 text-sm ${
                  selectedCapacity === capacity ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
                style={{ scrollSnapAlign: 'center' }}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {groupData.capacity === 'unlimited' ? 'Unlimited' : `${groupData.capacity} members`}
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground"
        disabled={!isFormValid}
      >
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupForm;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera } from 'lucide-react';

const EditGroupInfo = ({ group, onSave }) => {
  const [editedGroup, setEditedGroup] = useState({ ...group });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGroup(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedGroup(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedGroup);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <img src={editedGroup.banner} alt="Banner" className="w-full h-32 object-cover rounded-lg" />
        <label htmlFor="banner" className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer">
          <Camera className="text-white" />
        </label>
        <Input id="banner" type="file" className="hidden" onChange={(e) => handleImageChange(e, 'banner')} />
      </div>
      <div className="relative inline-block">
        <img src={editedGroup.image} alt="Group" className="w-24 h-24 rounded-full object-cover" />
        <label htmlFor="image" className="absolute bottom-0 right-0 bg-black/50 p-2 rounded-full cursor-pointer">
          <Camera className="text-white" />
        </label>
        <Input id="image" type="file" className="hidden" onChange={(e) => handleImageChange(e, 'image')} />
      </div>
      <div>
        <Label htmlFor="name">Group Name</Label>
        <Input id="name" name="name" value={editedGroup.name} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={editedGroup.description} onChange={handleChange} />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default EditGroupInfo;
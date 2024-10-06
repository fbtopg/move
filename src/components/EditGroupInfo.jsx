import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
      <div>
        <Label htmlFor="banner">Banner Image</Label>
        <Input id="banner" type="file" onChange={(e) => handleImageChange(e, 'banner')} />
      </div>
      <div>
        <Label htmlFor="image">Group Image</Label>
        <Input id="image" type="file" onChange={(e) => handleImageChange(e, 'image')} />
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
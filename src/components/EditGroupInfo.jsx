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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedGroup);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
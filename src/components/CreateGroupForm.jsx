import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateGroupForm = ({ handleCreateGroup }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      handleCreateGroup({ name: groupName.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Create a New Group</h2>
      <Input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
        className="w-full text-lg"
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={!groupName.trim()}
      >
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupForm;
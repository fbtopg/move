import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateGroupForm = ({ handleCreateGroup }) => {
  const [groupName, setGroupName] = useState('');

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      handleCreateGroup({ name: groupName.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">What do you want to call this group?</h2>
      <Input
        name="name"
        placeholder="Enter text"
        value={groupName}
        onChange={handleInputChange}
        className="w-full text-lg mb-auto"
      />
      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground mt-4"
        disabled={!groupName.trim()}
      >
        Create
      </Button>
    </form>
  );
};

export default CreateGroupForm;
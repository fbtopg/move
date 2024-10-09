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
        className="w-full text-lg border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black transition-colors duration-300 px-0"
      />
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className={`w-32 rounded-full border ${
              groupName.trim() 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-400 border-gray-300'
            } transition-colors duration-300`}
            disabled={!groupName.trim()}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateGroupForm;
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateGroupForm = ({ handleCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      try {
        await handleCreateGroup(groupName);
        setGroupName('');
        onClose();
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
      <div className="flex-grow">
        <label htmlFor="groupName" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Group name
        </label>
        <Input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-4 text-lg border-2 border-purple-200 rounded-3xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-colors"
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-8 bg-black text-white dark:bg-white dark:text-black py-4 rounded-full text-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateGroupForm;
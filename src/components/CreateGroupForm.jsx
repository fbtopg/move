import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

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
      <div className="flex-grow relative">
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-4 text-lg border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-colors pt-7"
        />
        <label
          htmlFor="groupName"
          className="absolute text-sm text-gray-500 top-2 left-4"
        >
          Group name
        </label>
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
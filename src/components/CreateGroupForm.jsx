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
      <div className="flex-grow relative mt-4 w-full">
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="block w-full px-4 pb-2 pt-6 text-lg bg-transparent border-2 border-blue-400 rounded-md outline-none focus:border-blue-600 peer bg-gradient-to-r from-blue-100 to-blue-200"
          placeholder=" "
        />
        <label
          htmlFor="groupName"
          className="absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-sm text-gray-500 transition-all"
        >
          Group name
        </label>
      </div>
      <Button
        type="submit"
        className="w-full mt-8 bg-black text-white dark:bg-white dark:text-black py-5 rounded-full text-xl font-normal hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateGroupForm;
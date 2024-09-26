import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';

const SearchPage = ({ isOpen, onClose, searchTerm, setSearchTerm }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 500 }}
      className="fixed inset-0 bg-black z-50"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Search groups or challenges"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-[#212124] border-none text-white placeholder-gray-400 rounded-full pl-6"
            autoFocus
          />
          <button onClick={onClose} className="ml-2 text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Add search results here */}
        <div className="text-white">
          {/* Placeholder for search results */}
          <p>Search results will appear here</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPage;
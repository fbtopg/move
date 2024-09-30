import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { ArrowLeft } from 'lucide-react';

const SearchPage = ({ isOpen, onClose, searchTerm, setSearchTerm }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 500 }}
      className="fixed inset-0 bg-black z-50"
    >
      <div className="p-4">
        <div className="relative flex items-center mb-4">
          <button 
            onClick={onClose} 
            className="absolute left-4 text-gray-400 z-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Input
            type="text"
            placeholder="Search groups or challenges"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-[#212124] border-none text-white placeholder-gray-400 rounded-full pl-12 pr-4"
            autoFocus
          />
        </div>
        <div className="text-white">
          {/* Placeholder for search results */}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPage;
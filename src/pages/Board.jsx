import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Board = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#FEF8F3] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 mt-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              className="w-full bg-[#1c1c1f] border-none text-gray-400 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search challenges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="text-center text-gray-400 mt-20">
            No upcoming challenges at the moment.
          </div>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Board;
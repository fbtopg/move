import React, { useState, useEffect } from 'react';
import { Search, Compass, Trophy } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavBar from '../components/BottomNavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Board = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.name = 'viewport';
    metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    document.head.appendChild(metaTag);

    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  const challenges = [
    { id: 1, title: 'Daily Walk Challenge', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30', participants: 15600, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20102.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTAyLnBuZyIsImlhdCI6MTcyNjI4ODYyNCwiZXhwIjoxNzU3ODI0NjI0fQ.MsMvXioJ2mxlqql64hI_aFCKVuY4qVrQHbpUG-DTkLQ&t=2024-09-14T04%3A37%3A06.339Z' },
    { id: 2, title: 'Daily Quiz Challenge', type: 'quiz', startDate: '2024-09-01', endDate: '2024-09-30', participants: 12400, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z' },
    { id: 3, title: 'Monthly Step Count', type: 'walk', startDate: '2024-09-01', endDate: '2024-09-30', participants: 9800, image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/jellywalk_Wide_banner-style_view_of_a_city_skyline_at_sunrise_18b1217e-a1de-41c2-b9f6-ad91ef777db7_3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvamVsbHl3YWxrX1dpZGVfYmFubmVyLXN0eWxlX3ZpZXdfb2ZfYV9jaXR5X3NreWxpbmVfYXRfc3VucmlzZV8xOGIxMjE3ZS1hMWRlLTQxYzItYjlmNi1hZDkxZWY3NzdkYjdfMy5wbmciLCJpYXQiOjE3MjczMzQzNTgsImV4cCI6MTc1ODg3MDM1OH0.khd3GCr1TE1KEdWUJjYadtduNCItFfbpOgDWPPXxmuI&t=2024-09-26T07%3A05%3A57.812Z' },
  ];

  const filteredChallenges = challenges.filter(challenge => 
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ChallengeCard = ({ challenge }) => (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onClick={() => navigate(`/${challenge.type}-challenge`)}
    >
      <div className="relative h-48">
        <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="text-white text-xl font-bold">{challenge.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">
          {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-500 font-semibold">{challenge.participants.toLocaleString()} participants</span>
          <Button
            className="bg-[#3B72EC] hover:bg-[#3B72EC]/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Join Now
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF8F3] to-[#F0E7E0] text-foreground flex flex-col">
      <div className="bg-[#FEF8F3] px-4 py-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Challenges</h1>
        </div>
        
        <div className="relative mb-4">
          <Input
            className="w-full bg-white border-none text-gray-900 placeholder-gray-500 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B72EC] focus:border-transparent"
            placeholder="Search challenges"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-full p-1">
            <TabsTrigger value="discover" className="rounded-full data-[state=active]:bg-[#3B72EC] data-[state=active]:text-white">
              <Compass className="w-4 h-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="myChallenges" className="rounded-full data-[state=active]:bg-[#3B72EC] data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              My Challenges
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-grow overflow-y-auto pb-20 px-4 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
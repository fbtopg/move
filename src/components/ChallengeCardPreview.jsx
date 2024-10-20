import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '../integrations/supabase/auth';

const ChallengeCardPreview = ({ onLoginRequired }) => {
  const { session } = useSupabaseAuth();

  const handleGetStarted = () => {
    if (!session) {
      onLoginRequired();
    } else {
      // TODO: Implement challenge start logic for authenticated users
      console.log('Starting challenge for authenticated user');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full max-w-sm bg-gradient-to-br from-blue-100 via-pink-100 to-blue-200 rounded-xl p-6 mt-4"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Challenge</h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        Complete today's challenge to earn points and climb the leaderboard!
      </p>
      <Button 
        className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 py-2 text-sm font-semibold rounded-full flex items-center justify-center group"
        onClick={handleGetStarted}
      >
        Get Started
        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
      </Button>
    </motion.div>
  );
};

export default ChallengeCardPreview;
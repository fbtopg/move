import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/supabase';
import BottomNavBar from '../components/BottomNavBar';
import ChallengeCard from '../components/ChallengeCard';
import ChallengeCardSkeleton from '../components/ChallengeCardSkeleton';

const fetchChallenges = async () => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*, title, description, step_one, step_two, step_three');
  if (error) throw error;
  return data;
};

const Board = () => {
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
  });

  return (
    <div className="min-h-screen bg-[#FBFCFC] text-foreground flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <motion.h2 
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Challenges
          </motion.h2>
          
          {isLoading ? (
            <ChallengeCardSkeleton />
          ) : error ? (
            <p>Error loading challenges: {error.message}</p>
          ) : challenges && challenges.length > 0 ? (
            challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4"
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))
          ) : (
            <p>No challenges available.</p>
          )}
        </div>
      </div>
      <BottomNavBar activeTab="challenge" />
    </div>
  );
};

export default Board;
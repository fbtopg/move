import React, { useState } from 'react';
import { ArrowLeft, Flame, Brain, Heart, Share, History, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { shareInvite } from '../utils/shareUtils';
import { getRandomProfilePicture } from '../utils/profilePictures';
import { motion } from 'framer-motion';

const DailyQuizChallenge = () => {
  const navigate = useNavigate();
  const [showFullImage, setShowFullImage] = useState(false);

  const challengeData = {
    month: "SEPTEMBER 2024",
    title: "Daily Quiz",
    progress: "11/30",
    answers: "11",
    likes: "124",
    highestStreak: "7",
    activeParticipants: "16.5k",
    startDate: "Sep 1",
    endDate: "Sep 30",
    remainingDays: "24 days",
    achievements: [
      { id: 1, name: "5-day streak", icon: Flame },
      { id: 2, name: "Conscious mind", icon: Brain },
      { id: 3, name: "100 likes", icon: Heart },
    ],
  };

  const participants = [
    { id: 1, name: "John" },
    { id: 2, name: "Emma" },
    { id: 3, name: "Alex" },
    { id: 4, name: "Sarah" },
    { id: 5, name: "Mike" },
  ];

  const handleHistoryClick = () => {
    navigate('/daily-quiz-history');
  };

  const toggleFullImage = () => {
    setShowFullImage(!showFullImage);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      className="fixed inset-0 bg-black text-white flex flex-col z-50"
    >
      <div className="sticky top-0 z-10 bg-black p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">{challengeData.title}</h1>
        <button onClick={handleHistoryClick} className="text-white">
          <History className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pb-20">
        <div className="bg-gradient-to-t from-gray-900 to-black p-4 relative">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-400">{challengeData.month}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-24 h-24 overflow-hidden">
              <img 
                src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z" 
                alt="Daily Quiz Challenge" 
                className="w-full h-full object-cover cursor-pointer"
                onClick={toggleFullImage}
              />
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">
                {challengeData.progress}
              </div>
              <div className="text-sm text-gray-400">PROGRESS</div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          <ChallengeDetails challengeData={challengeData} />
          <ChallengeParticipants participants={participants} activeParticipants={challengeData.activeParticipants} />
          <ChallengeAchievements achievements={challengeData.achievements} />
          <Button 
            className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors h-16 rounded-full"
            onClick={shareInvite}
          >
            <Share className="mr-2 h-5 w-5" />
            Invite Friends
          </Button>
        </div>
      </div>
      {showFullImage && <FullImageView toggleFullImage={toggleFullImage} />}
    </motion.div>
  );
};

const ChallengeDetails = ({ challengeData }) => (
  <>
    <div className="grid grid-cols-3 gap-1 text-xs mb-6">
      <DetailItem label="START" value={challengeData.startDate} />
      <DetailItem label="END" value={challengeData.endDate} />
      <DetailItem label="REMAINING" value={challengeData.remainingDays} />
    </div>
    <p className="text-xs text-gray-400 mb-4 pr-8">
      Engage your mind with the daily quiz challenge, designed to make you think more consciously about everyday topics. Each quiz encourages deeper reflection and awareness. By the end of the challenge, you'll have developed a habit of mindful thinking and earned rewards to celebrate your journey!
    </p>
    <div className="h-px bg-gray-700 my-6"></div>
    <h2 className="text-sm font-semibold mb-4">SUMMARY</h2>
    <div className="flex mb-6 space-x-8">
      <DetailItem label="ANSWERS" value={challengeData.answers} />
      <DetailItem label="LIKES" value={challengeData.likes} />
      <DetailItem label="HIGHEST STREAK" value={challengeData.highestStreak} />
    </div>
  </>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p>{value}</p>
  </div>
);

const ChallengeParticipants = ({ participants, activeParticipants }) => (
  <>
    <div className="h-px bg-gray-700 my-4"></div>
    <div className="flex items-center mb-4">
      <div className="flex flex-shrink-0">
        {participants.map((participant) => (
          <Avatar key={participant.id} className="w-8 h-8 -ml-2 first:ml-0 border-2 border-black">
            <AvatarImage src={getRandomProfilePicture()} />
            <AvatarFallback>{participant.name[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="ml-2 text-sm text-gray-400">
        {activeParticipants} active
      </div>
    </div>
  </>
);

const ChallengeAchievements = ({ achievements }) => (
  <>
    <div className="h-px bg-gray-700 my-4"></div>
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">ACHIEVEMENTS</h2>
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className="flex flex-col items-center justify-center w-full aspect-square rounded-lg"
            style={{
              background: 'radial-gradient(circle at center, #222222, #111111)',
            }}
          >
            <achievement.icon className="h-24 w-24 text-white mb-2 stroke-[0.5]" />
            <span className="text-sm text-center px-2">{achievement.name}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

const FullImageView = ({ toggleFullImage }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={toggleFullImage}>
    <img 
      src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/Frame%20104.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvRnJhbWUgMTA0LnBuZyIsImlhdCI6MTcyNjI4ODY3MCwiZXhwIjoxNzU3ODI0NjcwfQ.TdGTOMcfEw-wL-0ixshR_ckOzdkla8FJaSOymB8zA0M&t=2024-09-14T04%3A37%3A51.908Z" 
      alt="Daily Quiz Challenge" 
      className="max-w-full max-h-full object-contain"
    />
    <button 
      className="absolute top-4 right-4 text-white"
      onClick={toggleFullImage}
    >
      <X className="h-6 w-6" />
    </button>
  </div>
);

export default DailyQuizChallenge;

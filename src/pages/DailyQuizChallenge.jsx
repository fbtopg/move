import React, { useState } from 'react';
import { ArrowLeft, Flame, Brain, Heart, ArrowRight, Share, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { shareInvite } from '../utils/shareUtils';
import { getRandomProfilePicture } from '../utils/profilePictures';

const DailyQuizChallenge = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('walk');

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-2">
          <button onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">{challengeData.month}</p>
              <h1 className="text-3xl font-bold">{challengeData.title}</h1>
            </div>
            <button onClick={handleHistoryClick} className="flex items-center">
              <History className="h-7 w-7 text-white stroke-[1.5]" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs mb-6">
            <div>
              <p className="text-gray-400">START</p>
              <p>{challengeData.startDate}</p>
            </div>
            <div>
              <p className="text-gray-400">END</p>
              <p>{challengeData.endDate}</p>
            </div>
            <div>
              <p className="text-gray-400">REMAINING</p>
              <p>{challengeData.remainingDays}</p>
            </div>
          </div>

          <Button 
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors mb-4 h-16 flex justify-between items-center px-6"
          >
            <span>Check today's quiz</span>
            <ArrowRight className="h-6 w-6" />
          </Button>

          <Button 
            className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors mb-6 h-16 flex justify-between items-center px-6"
          >
            <span>Check reward</span>
            <ArrowRight className="h-6 w-6" />
          </Button>

          <div className="w-full h-40 rounded-lg mb-6 overflow-hidden">
            <img 
              src="https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailyquizimage5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHlxdWl6aW1hZ2U1LnBuZyIsImlhdCI6MTcyNTY4OTMxOSwiZXhwIjoxNzU3MjI1MzE5fQ.9EInspWLkGg7g5fBzJgbJM6tZt8b-XC3pq3TTh9vIZs&t=2024-09-07T06%3A08%3A39.441Z" 
              alt="Daily Quiz Challenge" 
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-gray-400 mb-4 pr-8">
            Engage your mind with the daily quiz challenge, designed to make you think more consciously about everyday topics. Each quiz encourages deeper reflection and awareness. Miss a day? No problem—just take two quizzes next time to stay on track. By the end of the challenge, you'll have developed a habit of mindful thinking and earned rewards to celebrate your journey!
          </p>

          <div className="mb-6">
            <div className="text-4xl font-bold">
              {challengeData.progress}
            </div>
            <div className="text-sm text-gray-400">PROGRESS</div>
          </div>

          <div className="flex mb-6 space-x-8">
            <div>
              <div className="text-xs text-gray-400">ANSWERS</div>
              <div className="text-base font-bold">{challengeData.answers}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">LIKES</div>
              <div className="text-base font-bold">{challengeData.likes}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">HIGHEST STREAK</div>
              <div className="text-base font-bold">{challengeData.highestStreak}</div>
            </div>
          </div>

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
              {challengeData.activeParticipants} active
            </div>
          </div>

          <div className="h-px bg-gray-700 my-4"></div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">ACHIEVEMENTS</h2>
            <div className="grid grid-cols-2 gap-4">
              {challengeData.achievements.map((achievement) => (
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

          <Button 
            className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors h-16 rounded-full"
            onClick={shareInvite}
          >
            <Share className="mr-2 h-5 w-5" />
            Invite Friends
          </Button>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default DailyQuizChallenge;
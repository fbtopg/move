import React, { useState } from 'react';
import { ArrowLeft, Flame, Wind, Heart, ArrowRight, Share, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { supabase } from '../integrations/supabase';

const DailyWalkChallenge = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('walk');
  const [imageUrl, setImageUrl] = useState(null);

  React.useEffect(() => {
    const fetchImage = async () => {
      const { data, error } = await supabase.storage
        .from('dailychallenge')
        .getPublicUrl('dailywalkimage5');
      
      if (error) {
        console.error('Error fetching image:', error);
      } else {
        setImageUrl(data.publicUrl);
      }
    };

    fetchImage();
  }, []);

  const challengeData = {
    month: "SEPTEMBER 2024",
    title: "Daily Walk",
    rank: "501",
    totalParticipants: "16.5K",
    distance: "56.7km",
    likes: "124",
    highestStreak: "7",
    activeParticipants: "16.5k",
    achievements: [
      { id: 1, name: "5-day streak", icon: Flame },
      { id: 2, name: "Breezy walker-10km", icon: Wind },
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

  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  const handleHistoryClick = () => {
    navigate('/daily-walk-history');
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

          <Button 
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors mb-4 h-16 flex justify-between items-center px-6"
          >
            <span>Start walking</span>
            <ArrowRight className="h-6 w-6" />
          </Button>

          <Button 
            className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors mb-6 h-16 flex justify-between items-center px-6"
          >
            <span>Check reward</span>
            <ArrowRight className="h-6 w-6" />
          </Button>

          {imageUrl && (
            <div className="w-full h-40 rounded-lg mb-6 overflow-hidden">
              <img src={imageUrl} alt="Daily Walk Challenge" className="w-full h-full object-cover" />
            </div>
          )}

          <p className="text-sm text-gray-400 mb-4 pr-8">
            Build a consistent routine with the daily walking challenge. Whether it's a short walk around the block or a longer trek, every walk helps you move forward. If you miss a day, just make up for it the next time. Stay committed, and at the end of the challenge, you'll have not only built a habit but earned rewards to celebrate your progress!
          </p>

          <div className="mb-6">
            <div className="text-4xl font-bold">
              {challengeData.rank}
              <span className="text-gray-400 text-2xl">/{challengeData.totalParticipants}</span>
            </div>
            <div className="text-sm text-gray-400">RANK</div>
          </div>

          <div className="flex mb-6 space-x-8">
            <div>
              <div className="text-xs text-gray-400">DISTANCE</div>
              <div className="text-base font-bold">{challengeData.distance}</div>
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

          <div className="flex items-center mb-4 cursor-pointer" onClick={handleLeaderboardClick}>
            <div className="flex flex-shrink-0">
              {participants.map((participant) => (
                <Avatar key={participant.id} className="w-8 h-8 -ml-2 first:ml-0 border-2 border-black">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${participant.name}`} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="ml-2 text-sm text-gray-400">
              {challengeData.activeParticipants} active
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">ACHIEVEMENTS</h2>
            <div className="grid grid-cols-2 gap-6">
              {challengeData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex flex-col items-center">
                  <achievement.icon className="h-16 w-16 text-white mb-2" />
                  <span className="text-sm text-center">{achievement.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors h-16 rounded-full">
            <Share className="mr-2 h-5 w-5" />
            Invite Friends
          </Button>
        </div>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default DailyWalkChallenge;
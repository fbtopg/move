import React from 'react';
import { ArrowLeft, Flame, Wind, Heart, Brain, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Achievements = () => {
  const navigate = useNavigate();

  const achievements = [
    { id: 1, name: "5-day streak", icon: Flame, count: 3 },
    { id: 2, name: "Breezy walker-10km", icon: Wind, count: 2 },
    { id: 3, name: "100 likes", icon: Heart, count: 1 },
    { id: 4, name: "Quiz master", icon: Brain, count: 5 },
    { id: 5, name: "Challenge champion", icon: Trophy, count: 2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-2">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h1 className="text-2xl font-bold mb-6">Achievements</h1>

          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className="flex items-center justify-between h-12 border border-gray-700 rounded-lg p-2"
              >
                <div className="flex items-center">
                  <achievement.icon className="h-8 w-8 text-white mr-4 stroke-[1.5]" />
                  <span className="text-sm">{achievement.name}</span>
                </div>
                <span className="text-xs font-normal text-gray-400">{achievement.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
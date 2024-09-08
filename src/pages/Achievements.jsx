import React from 'react';
import { ArrowLeft, Flame, Wind, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Achievements = () => {
  const navigate = useNavigate();

  const achievements = [
    { id: 1, name: "5-day streak", icon: Flame },
    { id: 2, name: "Breezy walker-10km", icon: Wind },
    { id: 3, name: "100 likes", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-md mx-auto p-4">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h1 className="text-2xl font-bold mb-6">Achievements</h1>

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
      </div>
    </div>
  );
};

export default Achievements;
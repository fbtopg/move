import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Walk = () => {
  const navigate = useNavigate();

  const challengeData = {
    distance: "56.7km",
    likes: "124",
    highestStreak: "7",
  };

  const activeChallenges = [
    { name: "Daily Walk", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailywalkimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHl3YWxraW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU3NjM1MTgsImV4cCI6MTc1NzI5OTUxOH0.GLkQ1VOFZKx98eUHrlNTYxPi7lBaji1GVRee_iUDljs&t=2024-09-08T02%3A45%3A16.927Z", date: "September 2024" },
  ];

  const handleChallengeClick = () => {
    navigate('/daily-walk-challenge');
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="p-4 bg-[#111111]">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-base text-white hover:text-gray-200 transition-colors"
          >
            Close
          </button>
          <h1 className="text-base font-normal">Walk</h1>
          <div className="w-12"></div> {/* Placeholder for balance */}
        </div>
      </div>

      <div className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>

      <div className="bg-[#111111] p-4">
        <div className="mb-4">
          {activeChallenges.map((challenge, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between h-12 border border-gray-700 rounded-lg p-2 cursor-pointer"
              onClick={handleChallengeClick}
            >
              <div>
                <p className="text-sm">{challenge.name}</p>
                <p className="text-xs text-gray-400">{challenge.date}</p>
              </div>
              <div className="flex items-center">
                <img src={challenge.image} alt={challenge.name} className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-xs text-gray-400">DISTANCE</p>
            <p className="text-xs font-bold">{challengeData.distance}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">LIKES</p>
            <p className="text-xs font-bold">{challengeData.likes}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">HIGHEST STREAK</p>
            <p className="text-xs font-bold">{challengeData.highestStreak}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button className="w-16 h-16 bg-white text-black hover:bg-gray-200 transition-colors rounded-full text-sm font-bold">
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Walk;
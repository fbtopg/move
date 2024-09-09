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

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="p-4 bg-[#111111]">
        <button 
          onClick={() => navigate('/')} 
          className="mb-2 text-base text-white hover:text-gray-200 transition-colors"
        >
          Close
        </button>

        <div className="grid grid-cols-3 gap-4 mb-2 text-center">
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
      </div>

      <div className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>

      <div className="h-32 relative">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-[#111111]"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[#111111] flex items-center justify-center">
          <Button className="w-24 h-24 bg-white text-black hover:bg-gray-200 transition-colors rounded-full text-lg font-bold absolute bottom-4">
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Walk;
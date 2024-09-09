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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-4">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Close
        </button>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-400">DISTANCE</p>
            <p className="text-sm font-bold">{challengeData.distance}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">LIKES</p>
            <p className="text-sm font-bold">{challengeData.likes}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">HIGHEST STREAK</p>
            <p className="text-sm font-bold">{challengeData.highestStreak}</p>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>

      <div className="p-4 flex justify-center">
        <Button className="w-24 h-24 bg-white text-black hover:bg-gray-200 transition-colors rounded-full text-lg font-bold">
          START
        </Button>
      </div>
    </div>
  );
};

export default Walk;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, useMap, Circle, CircleMarker } from 'react-leaflet';
import { Locate } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const Walk = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const challengeData = {
    distance: "56.7km",
    likes: "124",
    highestStreak: "7",
  };

  const activeChallenges = [
    { name: "Daily Walk", image: "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/dailychallenge/dailywalkimage5_square_small.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZGFpbHljaGFsbGVuZ2UvZGFpbHl3YWxraW1hZ2U1X3NxdWFyZV9zbWFsbC5wbmciLCJpYXQiOjE3MjU3NjM1MTgsImV4cCI6MTc1NzI5OTUxOH0.GLkQ1VOFZKx98eUHrlNTYxPi7lBaji1GVRee_iUDljs&t=2024-09-08T02%3A45%3A16.927Z", date: "September 2024" },
  ];

  const friendActivities = [
    { username: "Emma", distance: "1.2km", timestamp: "2m ago" },
    { username: "John", distance: "2.5km", timestamp: "5m ago" },
    { username: "Sarah", distance: "800m", timestamp: "10m ago" },
  ];

  const handleChallengeClick = () => {
    navigate('/daily-walk-challenge');
  };

  const LocationMarker = () => {
    const map = useMap();
    
    useEffect(() => {
      if (position) {
        map.flyTo(position, 16);
      }
    }, [position, map]);

    return position === null ? null : (
      <>
        <Circle 
          center={position} 
          radius={15} 
          pathOptions={{ color: '#4a90e2', fillColor: '#4a90e2', fillOpacity: 0.3 }} 
        />
        <CircleMarker 
          center={position} 
          radius={5} 
          pathOptions={{ color: '#1c6ed1', fillColor: '#1c6ed1', fillOpacity: 1 }} 
        />
      </>
    );
  };

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          alert(`Unable to retrieve your location: ${error.message}`);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="p-3 bg-black">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-base text-white hover:text-gray-200 transition-colors"
          >
            Close
          </button>
          <h1 className="text-base font-semibold">Walk</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
        <div className="absolute bottom-0 left-0 right-0 bg-[#39FF14] p-2 overflow-hidden z-[1000]">
          <div className="flex whitespace-nowrap animate-marquee">
            {friendActivities.map((activity, index) => (
              <span key={index} className="inline-block mr-8 text-xs text-black">
                <strong>{activity.username}</strong> just finished walking {activity.distance}. {activity.timestamp}
              </span>
            ))}
            {friendActivities.map((activity, index) => (
              <span key={`repeat-${index}`} className="inline-block mr-8 text-xs text-black">
                <strong>{activity.username}</strong> just finished walking {activity.distance}. {activity.timestamp}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 z-[1000]">
          <Button
            className="bg-white text-black hover:bg-gray-200 transition-colors rounded-full p-2"
            onClick={handleFindLocation}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : <Locate className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div className="bg-[#111111] p-3 pb-10">
        <div className="mb-3">
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

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
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

        <div className="flex items-center justify-center mt-3">
          <Button className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white transition-colors rounded-full text-sm font-bold">
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Walk;
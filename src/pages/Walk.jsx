import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from 'react-leaflet';
import { Locate, ArrowLeft, History } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) map.flyTo(position, 16);
  }, [position, map]);

  return position && (
    <>
      <Circle center={position} radius={15} pathOptions={{ color: '#4a90e2', fillColor: '#4a90e2', fillOpacity: 0.3 }} />
      <CircleMarker center={position} radius={5} pathOptions={{ color: '#1c6ed1', fillColor: '#1c6ed1', fillOpacity: 1 }} />
    </>
  );
};

const Walk = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
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
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="sticky top-0 z-10 bg-black p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">Daily Walk</h1>
        <button onClick={() => navigate('/daily-walk-history')} className="text-white">
          <History className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker position={position} />
        </MapContainer>
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

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from 'react-leaflet';
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
import { Footprints, Play, Pause } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const OrientationMarker = ({ position }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !position) return;

    const handleOrientation = (event) => {
      const { alpha } = event;
      if (alpha !== null && markerRef.current) {
        markerRef.current.setRotationAngle(alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [map, position]);

  if (!position) return null;

  return (
    <CircleMarker
      center={position}
      radius={5}
      pathOptions={{ color: '#1c6ed1', fillColor: '#1c6ed1', fillOpacity: 1 }}
      ref={markerRef}
    />
  );
};

const Walk = () => {
  const [position, setPosition] = useState(null);
  const [activeTab, setActiveTab] = useState('walk');
  const [isWalking, setIsWalking] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error(`Error: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isWalking) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setSteps((prevSteps) => prevSteps + Math.floor(Math.random() * 3) + 1);
        setDistance((prevDistance) => prevDistance + Math.random() * 0.01);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

  const handleStartStop = () => {
    setIsWalking(!isWalking);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-28">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Walk</h1>
          <div className="h-[450px] mb-6 relative rounded-lg overflow-hidden">
            {position && (
              <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                  maxZoom={19}
                />
                <Circle 
                  center={position} 
                  radius={15} 
                  pathOptions={{ color: '#4a90e2', fillColor: '#4a90e2', fillOpacity: 0.3 }} 
                />
                <OrientationMarker position={position} />
              </MapContainer>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400">Steps</p>
              <p className="text-2xl font-bold">{steps}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400">Distance</p>
              <p className="text-2xl font-bold">{distance.toFixed(2)} km</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400">Time</p>
              <p className="text-2xl font-bold">{formatTime(time)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-20 left-0 right-0 px-4 mb-4">
        <Button
          onClick={handleStartStop}
          className="bg-[#DBE9FE] text-black hover:bg-[#C5D9F9] font-semibold py-6 px-4 rounded-lg text-xl w-full poetsen-one-regular flex items-center justify-center"
          style={{ fontFamily: '"Poetsen One", sans-serif', fontWeight: 400 }}
        >
          {isWalking ? (
            <>
              <Pause className="mr-2 h-6 w-6" />
              PAUSE
            </>
          ) : (
            <>
              <Play className="mr-2 h-6 w-6" />
              START
            </>
          )}
        </Button>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Walk;

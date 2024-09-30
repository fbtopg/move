import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from 'react-leaflet';
import BottomNavBar from '../components/BottomNavBar';
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
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

  const handleStartWalk = () => {
    // Placeholder for start walk functionality
    console.log("Start walk clicked");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow overflow-y-auto pb-28">
        <div className="max-w-md mx-auto p-4">
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
        </div>
      </div>
      <div className="fixed bottom-20 left-0 right-0 px-4 mb-4">
        <Button
          onClick={handleStartWalk}
          className="bg-[#DBE9FE] text-black hover:bg-[#C5D9F9] font-semibold py-6 px-4 rounded-lg text-xl w-full poetsen-one-regular"
          style={{ fontFamily: '"Poetsen One", sans-serif', fontWeight: 400 }}
        >
          START
        </Button>
      </div>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Walk;
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from 'react-leaflet';
import BottomNavBar from '../components/BottomNavBar';
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

  return (
    <div className="h-screen flex flex-col bg-black text-white relative">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {position && (
          <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
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
      <div className="relative flex-grow" style={{ zIndex: 1 }}>
        {/* Content above the map can be added here */}
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to top, #212124 85%, rgba(33, 33, 36, 0.2) 100%)'
        }}
      ></div>
      <div className="relative" style={{ zIndex: 3 }}>
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Walk;

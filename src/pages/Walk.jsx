import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Circle, CircleMarker } from 'react-leaflet';
import BottomNavBar from '../components/BottomNavBar';
import 'leaflet/dist/leaflet.css';

const Walk = () => {
  const [position, setPosition] = useState(null);
  const [activeTab, setActiveTab] = useState('walk');

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
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Walk;

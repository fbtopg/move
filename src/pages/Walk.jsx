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
    <div className="h-screen flex flex-col bg-black text-white relative">
      <div className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            maxZoom={19}
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div 
        className="absolute bottom-16 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #212124, transparent)',
        }}
      ></div>
      <div className="h-16">
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Walk;

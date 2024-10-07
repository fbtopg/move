import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? <Marker position={position} /> : null;
};

const LocationPopup = ({ isOpen, onClose, onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (isOpen && !position) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, [isOpen, position]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setPosition({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const handleConfirm = () => {
    if (position) {
      onSelectLocation(position);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 500 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg p-6"
      style={{ height: '80vh' }}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4">Choose Location</h2>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Search for a location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button onClick={handleSearch}><Search className="h-4 w-4" /></Button>
        </div>
        <Button onClick={handleUseCurrentLocation} className="mb-4">
          <MapPin className="h-4 w-4 mr-2" /> Use Current Location
        </Button>
        <div className="flex-grow mb-4">
          {position && (
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm Location</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationPopup;
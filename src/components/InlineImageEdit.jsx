import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';

const InlineImageEdit = ({ currentImage, onImageChange, className }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={currentImage}
        alt="Editable"
        className="w-full h-full object-cover"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full"
        onClick={handleImageClick}
      >
        <Camera className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default InlineImageEdit;
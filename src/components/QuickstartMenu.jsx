import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuickstartPopup from './QuickstartPopup';

const QuickstartMenu = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      <Button
        onClick={togglePopup}
        className="relative bg-primary rounded-full w-16 h-16 shadow-lg flex items-center justify-center z-10"
      >
        <Zap className="h-8 w-8 text-primary-foreground stroke-2" />
      </Button>
      <QuickstartPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
};

export default QuickstartMenu;
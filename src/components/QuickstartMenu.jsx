import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuickstartModal from './QuickstartModal';

const QuickstartMenu = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Button
        onClick={toggleModal}
        className="relative bg-primary rounded-full w-16 h-16 shadow-lg flex items-center justify-center z-10"
      >
        <Zap className="h-8 w-8 text-primary-foreground stroke-2" />
      </Button>
      <QuickstartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default QuickstartMenu;
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const QuickstartModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-[50vh] max-w-none p-0 m-0 border-t-0 flex flex-col absolute bottom-0 rounded-t-xl">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
          <DialogTitle className="text-xl font-bold w-full text-center">Choose activity</DialogTitle>
        </DialogHeader>
        <div className="bg-white dark:bg-gray-800 flex-grow flex flex-col justify-end p-6">
          <div className="flex flex-col items-center justify-end mb-8">
            <Button 
              onClick={() => console.log('Start button clicked')} 
              className="w-full flex items-center justify-center mb-4"
            >
              <Play className="mr-2 h-5 w-5" />
              START
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickstartModal;
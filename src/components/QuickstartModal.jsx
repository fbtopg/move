import React from 'react';
import { Button } from "@/components/ui/button";
import { Footprints } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const QuickstartModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-none p-0 m-0 border-t-0">
        <div className="bg-white dark:bg-gray-800 h-[30vh] w-full flex flex-col p-6">
          <div className="flex flex-col items-center justify-end flex-grow mb-8">
            <h2 className="text-2xl font-bold mb-4">Choose activity</h2>
            <Button 
              onClick={() => console.log('Walk button clicked')} 
              className="w-full flex items-center justify-center mb-4"
            >
              <Footprints className="mr-2 h-5 w-5" />
              Walk
            </Button>
            <p className="text-[10px] text-gray-500 mt-2 text-center font-light">
              By continuing, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickstartModal;
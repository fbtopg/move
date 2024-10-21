import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const QuickStartPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg p-6"
            style={{ height: '70vh' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Choose activity</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-hidden mb-6">
                <Carousel>
                  <CarouselContent>
                    <CarouselItem className="flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Walk</h3>
                        <p>Go for a refreshing walk</p>
                      </div>
                    </CarouselItem>
                    {/* Add more CarouselItems here for future activity types */}
                  </CarouselContent>
                </Carousel>
              </div>
              <Button 
                onClick={onClose} 
                className="w-full bg-primary text-white py-4 rounded-full text-xl font-bold"
              >
                START
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickStartPopup;
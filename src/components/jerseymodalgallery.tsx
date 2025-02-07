import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Image as LucideImage } from "lucide-react"
import Image from 'next/image'

const JerseyGalleryModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Updated jersey gallery with actual images
  const jerseyGallery = [
    { 
      id: 1, 
      image: "/olympus/jersey/babypink.webp",
      description: "Baby Pink - AIDS/BVOC AIDS" 
    },
    { 
      id: 2, 
      image: "/olympus/jersey/bisleri.webp",
      description: "Bisleri - VLSI" 
    },
    { 
      id: 3, 
      image: "/olympus/jersey/green.webp",
      description: "FLORESCENT LEMON - EXTC" 
    },
    { 
      id: 4, 
      image: "/olympus/jersey/blue.webp",
      description: "Dark Firozi - ECS" 
    },
    { 
      id: 5, 
      image: "/olympus/jersey/lemonyellow.webp",
      description: "Lemon Yellow - IT" 
    },
    { 
      id: 6, 
      image: "/olympus/jersey/red.webp",
      description: "Red - COMPS" 
    },
    { 
      id: 7, 
      image: "/olympus/jersey/orange.webp",
      description: "Orange - CYSE/BVOC CYSE" 
    },
    { 
      id: 8, 
      image: "/olympus/jersey/navyblue.webp",
      description: "Navy Blue - ACT" 
    },
  ];

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="mt-8 w-full max-w-md bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xl py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
      >
        <LucideImage className="w-6 h-6" />
        View Jersey Gallery
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white border border-white/20">
          <div className="p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Jersey Gallery
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
              {jerseyGallery.map((jersey) => (
                <div
                  key={jersey.id}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20">
                    <Image
                      src={jersey.image}
                      alt={jersey.description}
                      fill
                      className="object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-black/60 backdrop-blur-sm">
                      <p className="text-white text-sm md:text-lg font-medium">
                        {jersey.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JerseyGalleryModal;
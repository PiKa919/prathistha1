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
      image: "/olympus/jersey/babypink.jpeg",
      description: "Classic Red Jersey" 
    },
    { 
      id: 2, 
      image: "/olympus/jersey/bisleri.jpeg",
      description: "Blue Away Jersey" 
    },
    { 
      id: 3, 
      image: "/olympus/jersey/black.jpeg",
      description: "Special Edition Black" 
    },
    { 
      id: 4, 
      image: "/olympus/jersey/blue.jpeg",
      description: "Commemorative White" 
    },
    { 
      id: 5, 
      image: "/olympus/jersey/lemonyellow.jpeg",
      description: "Limited Edition Gold" 
    },
    { 
      id: 6, 
      image: "/olympus/jersey/red.jpeg",
      description: "Anniversary Edition" 
    },
    { 
      id: 7, 
      image: "/olympus/jersey/orange.jpeg",
      description: "Team Captain Jersey" 
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
        <DialogContent className="max-w-[75vw] max-h-[75vh] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white border border-white/20">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Jersey Gallery
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(75vh-8rem)]">
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
                      <p className="text-white text-lg font-medium">
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
"use client"

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MorphSlide } from "@/components/MorphSlide";


const locations = [
  { name: "Wankhede", image: "/clmeet/cc/wankhede.webp" },
  { name: "Andheri Sports Complex", image: "/clmeet/cc/andheri.webp" },
  { name: "Shivaji Park", image: "/clmeet/cc/shivaji.webp" },
  { name: "Dome", image: "/clmeet/cc/dome.webp" },
  { name: "Nesco", image: "/clmeet/cc/nesco.webp" },
  { name: "Royal Opera", image: "/clmeet/cc/opera.webp" },
  { name: "Mantralaya", image: "/clmeet/cc/mantralaya.webp" },
  { name: "Taj", image: "/clmeet/cc/taj.webp" },
  { name: "Army Camp/Lokhandwala", image: "/clmeet/cc/army.webp" },
  { name: "Bandstand", image: "/clmeet/cc/bandstand.webp" },
  { name: "Mehboob Studios", image: "/clmeet/cc/mehboob.webp" },
  { name: "Dagdi Chawl", image: "/clmeet/cc/dagdi.webp" },
  { name: "Queen Necklace", image: "/clmeet/cc/queen.webp" },
  { name: "King's Circle", image: "/clmeet/cc/kings.webp" },
  { name: "Kalaghoda", image: "/clmeet/cc/kalaghoda.webp" },
  { name: "Jio Garden", image: "/clmeet/cc/jio.webp" },
  { name: "Mannat", image: "/clmeet/cc/mannat.webp" },
  { name: "NMACC", image: "/clmeet/cc/nmacc.webp" },
  { name: "Colaba Causeway", image: "/clmeet/cc/colaba.webp" },
  { name: "Gate Way of India", image: "/clmeet/cc/gateway.webp" },
  { name: "JJ School of Arts", image: "/clmeet/cc/jj.webp" },
  { name: "Jahangir Art Gallery", image: "/clmeet/cc/jahangir.webp" },
  { name: "Crawford Market", image: "/clmeet/cc/crawford.webp" },
  { name: "Bounce", image: "/clmeet/cc/bounce.webp" },
  { name: "Smashh", image: "/clmeet/cc/smashh.webp" },
  { name: "Film City", image: "/clmeet/cc/filmcity.webp" },
  { name: "Dharavi", image: "/clmeet/cc/dharavi.webp" }
];

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % locations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + locations.length) % locations.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        nextSlide();
      } else if (event.key === "ArrowUp") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {locations.map((location, index) => (
          <MorphSlide
            key={index}
            location={location.name}
            imageUrl={location.image}
            isActive={index === currentSlide}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const slides = [
    "/assets/banner/olympus/slide1.jpg",
    "/assets/banner/olympus/slide1.jpg",
    "/assets/banner/olympus/slide1.jpg",
    "/assets/banner/olympus/slide1.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Add loading handler
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
          <Image
            src={slide}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={handleImageLoad}
            sizes="100vw"
            quality={75}
          />
        </div>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Carousel);
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import ScrollGallery from "@/components/scroll-gallery";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import CountdownTimer from "@/components/ui/count-down";
import ContactSection from "@/components/map";
import { Camera, ArrowRight, Play } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Array of memory images
  const memoryImages = [
    "/scroll/1.webp",
    "/scroll/2.webp",
    "/scroll/3.webp",
    "/scroll/4.webp",
    "/scroll/5.webp",
    "/scroll/6.webp",
    "/scroll/7.webp",
    "/scroll/8.webp",
    "/scroll/9.webp",
    "/scroll/10.webp",
    "/scroll/11.webp",
    "/scroll/12.webp",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % memoryImages.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [memoryImages.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memoryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + memoryImages.length) % memoryImages.length
    );
  };

  const targetDate = new Date("2025-02-07T11:00:00"); // 21st February 2025

  return (
    <div className="min-h-screen">
      {isLoading ? null : (
        <div className="flex flex-col min-h-screen backdrop-blur-sm bg-transparent">
          <div className="flex-grow">
            {/* Hero Section with Slideshow */}
            <div className="relative w-full h-screen overflow-hidden">
              {/* Background Slideshow */}
              <div className="absolute inset-0">
                {memoryImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Prathistha Memory ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      onError={(e) => {
                        // Fallback to jpg if webp fails
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes(".webp")) {
                          target.src = target.src.replace(".webp", ".jpg");
                        }
                      }}
                    />
                  </div>
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                →
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                {memoryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-goldenrod scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                ))}
              </div>

              {/* Hero Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  {/* Main Title */}
                  <h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 cursor-default"
                    style={{ fontFamily: "MAEL, sans-serif" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="bg-gradient-to-r from-yellow-400 via-goldenrod to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-500 hover:to-goldenrod transition-all duration-500">
                      Prathistha
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 font-light">
                    Celebrating Memories, Creating New Ones
                  </p>

                  {/* Description */}
                  <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Experience the magic of our annual college festival where
                    tradition meets innovation, and every moment becomes a
                    cherished memory.
                  </p>

                  {/* Call to Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/gallery">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-yellow-500/25 flex items-center gap-3 text-lg border-2 border-yellow-400/50 hover:border-yellow-300">
                        <Camera className="w-6 h-6" />
                        <span>View Gallery</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>

                    <Link href="/events">
                      <button className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white font-bold px-10 py-5 rounded-full hover:bg-white/30 hover:border-white/70 transition-all duration-300 transform hover:scale-110 flex items-center gap-3 text-lg shadow-xl">
                        <Play className="w-5 h-5" />
                        <span>Explore Events</span>
                      </button>
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl font-bold text-goldenrod mb-2">
                        10+
                      </div>
                      <div className="text-white/80">Years of Excellence</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl font-bold text-goldenrod mb-2">
                        50+
                      </div>
                      <div className="text-white/80">Amazing Events</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl font-bold text-goldenrod mb-2">
                        5000+
                      </div>
                      <div className="text-white/80">Happy Participants</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Join Broadcast - Spline Container (Alternative Option) */}
            <div className="spline-container">
              <Spline scene="https://prod.spline.design/GfOUfu42ul3wEdHu/scene.splinecode" />
            </div>
            {/* <div className="countdown-timer">
              <CountdownTimer targetDate={targetDate} />
            </div> */}

            {/* <main className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-black-100 p-4 gap-6">
              <div className="w-[50%] md:w-[45%] flex justify-center">
                <Image
                  src="/assets/banner/YuvaBanner.png"
                  alt="Event Banner"
                  width={500}
                  height={600}
                  className="w-full h-auto max-w-[500px] md:max-w-[500px] rounded-lg object-cover shadow-lg"
                />
              </div>

              <div className="max-w-md text-center text-white px-4">
                <h2 className="text-2xl font-bold">Experience the Magic!</h2>
                <p className="mt-2 text-lg">
                  Join us for an unforgettable musical journey featuring top artists and mesmerizing performances.
                </p>
              </div>

              <div className="w-[90%] md:w-[45%] flex justify-center">
                <SingerReveal />
              </div>
            </main> */}

            {/* <FestivalPhases /> */}
            <ScrollGallery />
            <ContactSection />
          </div>
        </div>
      )}
    </div>
  );
}

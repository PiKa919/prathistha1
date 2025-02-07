"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import ScrollGallery from '@/components/scroll-gallery';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './styles.css';
import CountdownTimer from '@/components/ui/count-down';
import FestivalPhases from '@/components/Festivephases';
import ContactSection from '@/components/map';
import SingerReveal from '@/components/SingerSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const targetDate = new Date('2025-02-07T11:00:00'); // 21st February 2025

  return (
    <div className="min-h-screen">
      {isLoading ? null : (
        <div className="flex flex-col min-h-screen backdrop-blur-sm bg-transparent">
          <div className="flex-grow">
            <div className="relative w-full aspect-video max-h-[100vh]">
              <div className="absolute inset-0 bg-black">
                <video 
                  autoPlay 
                  muted 
                  loop={true}
                  playsInline
                  poster="/assets/banner/homepage.webp"
                  className="w-full h-full object-cover"
                  preload="auto"
                  onCanPlay={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.play().catch(error => console.log("Autoplay prevented:", error));
                  }}
                >
                  <source src="/assets/hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </div>

            <div className="spline-container">
              <Spline scene="https://prod.spline.design/GfOUfu42ul3wEdHu/scene.splinecode" />
            </div>

            <div className="countdown-timer">
              <CountdownTimer targetDate={targetDate} />
            </div>

            <main className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-black-100 p-4 gap-6">
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
            </main>

            <FestivalPhases />
            <ScrollGallery />
            <ContactSection/>
          </div>
        </div>
      )}
    </div>
  );
}
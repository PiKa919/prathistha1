"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
// import { WavyBackground } from '@/components/wavy-background';
// import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
// import ScratchToReveal from "@/components/scratchtoreveal";

// function BroadcastButton() {
//   const [isGlowing, setIsGlowing] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsGlowing((prev) => !prev);
//     }, 1500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="broadcast-button-container">
//       <div className="broadcast-button-wrapper">
//         <button className={`broadcast-button ${isGlowing ? 'glowing' : ''}`}>
//           Join the Broadcast Channel
//         </button>
//       </div>
//     </div>
//   );
// }

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
      {isLoading ? (
        null
      ) : (
        <div className="flex flex-col min-h-screen backdrop-blur-sm bg-transparent">
          <div className="flex-grow">
            <div className="content">
              <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image src="/assets/banner/homepage.webp" alt="Banner 1" width={400} height={300} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src="/assets/banner/homepage.webp" alt="Banner 2" width={400} height={300} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src="/assets/banner/homepage.webp" alt="Banner 3" width={400} height={300}/>
                </SwiperSlide>
                <SwiperSlide>
                  <Image src="/assets/banner/homepage.webp" alt="Banner 4" width={400} height={300} />
                </SwiperSlide>
              </Swiper>
            </div>
            {/* <BroadcastButton /> */}
            {/* Replacing BroadcastButton with Spline */}
            <div className="spline-container">
              <Spline scene="https://prod.spline.design/GfOUfu42ul3wEdHu/scene.splinecode" />
            </div>

            {/* Image Section Below Countdown (Side by Side in a Single Div) */}
            <div className="countdown-timer">
              <CountdownTimer targetDate={targetDate} />
            </div>
            {/* <SingerReveal /> */}
            {/* <WavyBackground className="max-w-4xl  pt-96"> */}
              <main className="flex justify-center items-center min-h-screen bg-black-100  gap-6">
                <Image
                  src="/assets/banner/YuvaBanner.png"
                  alt="Event Banner"
                  width={500} // Set equal width
                  height={600} // Set equal height
                  className="rounded-lg object-cover shadow-lg"
                />
                <div className="max-w-md text-center text-white">
                  <h2 className="text-2xl font-bold">Experience the Magic!</h2>
                  <p className="mt-2 text-lg">
                    Join us for an unforgettable musical journey featuring top artists and mesmerizing performances.
                  </p>
                </div>
                <main className="flex items-center justify-center min-h-screen bg-black-100 p-4">
                  <SingerReveal />
                </main>
                
              </main>
            {/* </WavyBackground> */}
            <FestivalPhases />
            <ScrollGallery />
            <ContactSection/>
          </div>
        </div>
      )}
    </div>
  );
}
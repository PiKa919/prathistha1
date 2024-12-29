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
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const targetDate = new Date('2025-12-30T00:00:00'); // 21st February 2025

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
            <div className="countdown-timer">
              <CountdownTimer targetDate={targetDate} />
            </div>
            <FestivalPhases />
            <ScrollGallery />
          </div>
        </div>
      )}
    </div>
  );
}
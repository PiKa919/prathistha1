"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './styles.css';

function BroadcastButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="https://whatsapp.com/channel/0029Vant5jpD38COvx6OuR3w" target='_blank' passHref>
        <button
          className={`w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
            isGlowing ? 'animate-pulse' : ''
          }`}
          style={{
            boxShadow: isHovered
              ? '0 0 15px #8B5CF6, 0 0 30px #8B5CF6, 0 0 45px #8B5CF6'
              : '0 0 5px #8B5CF6, 0 0 10px #8B5CF6',
            textShadow: '0 0 5px rgba(255,255,255,0.7)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Join the Broadcast Channel
        </button>
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="content flex-grow">
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
            <img src="../../assets/banner/banner1.jpg" alt="Banner 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../assets/banner/banner2.jpg" alt="Banner 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../assets/banner/banner3.jpg" alt="Banner 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../assets/banner/banner4.jpg" alt="Banner 4" />
          </SwiperSlide>
        </Swiper>
      </div>
      <BroadcastButton />
    </div>
  );
}
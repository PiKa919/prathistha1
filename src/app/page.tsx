"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
      </div>
    </div>
  );
}

function FestivalPhases() {
  const phases = [
    {
      name: 'YUVA',
      description: 'A celebration of youth and vigor, YUVA kicks off our fest with high energy events and performances.',
      bgColor: 'from-blue-100 to-purple-100',
      glowColor: 'blue',
      imagePath: '/phases/yuva.jpg'
    },
    {
      name: 'OLYMPUS',
      description: 'Channeling the spirit of ancient Greek games, OLYMPUS brings competitive sports and intellectual challenges.',
      bgColor: 'from-blue-100 to-green-100',
      glowColor: 'green',
      imagePath: '/phases/olympus.jpg'
    },
    {
      name: 'AURUM',
      description: 'AURUM, our golden phase, showcases the pinnacle of talent and creativity across various disciplines.',
      bgColor: 'from-blue-100 to-yellow-100',
      glowColor: 'yellow',
      imagePath: '/phases/aurum.jpg'
    },
    {
      name: 'VERVE',
      description: 'The grand finale, VERVE, is a spectacular display of music, dance, and cultural extravaganza.',
      bgColor: 'from-blue-100 to-red-100',
      glowColor: 'red',
      imagePath: '/phases/verve.jpg'
    }
  ]

  return (
    <div className="bg-gray-100 py-8">
      <main className="container mx-auto px-4 relative">
        {phases.map((phase, index) => (
          <div key={phase.name} className="relative">
            <section className={`mb-24 p-8 rounded-lg shadow-lg bg-gradient-to-br ${phase.bgColor} mx-auto`} style={{ width: '80%' }}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                <div className="relative w-full md:w-1/2 aspect-video">
                  <div
                    className={`absolute inset-0 rounded-lg filter blur-xl bg-${phase.glowColor}-300 opacity-75 animate-pulse`}
                  ></div>
                  <Image
                    src={phase.imagePath || '/default-image-path.svg'}
                    alt={`${phase.name} image`}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md relative z-10"
                  />
                  <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-text z-20">
                    {phase.name}
                  </h2>
                </div>
                <p className={`w-full md:w-1/2 text-lg text-gray-700 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  {phase.description}
                </p>
              </div>
            </section>
            {index < phases.length - 1 && (
              <svg
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-24 text-blue-500"
                fill="none"
                viewBox="0 0 32 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0 Q32 48 16 96"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        ))}
      </main>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
        <FestivalPhases />
      </div>
    </div>
  );
}
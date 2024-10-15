"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from 'framer-motion';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './styles.css';

function BroadcastButton() {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="broadcast-button-container">
      <div className="broadcast-button-wrapper">
        <button
          className={`broadcast-button ${isGlowing ? 'glowing' : ''}`}
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
      bgClass: 'bg-yuva',
      glowClass: 'glow-yuva',
      imagePath: '/phases/yuva.jpg'
    },
    {
      name: 'OLYMPUS',
      description: 'Channeling the spirit of ancient Greek games, OLYMPUS brings competitive sports and intellectual challenges.',
      bgClass: 'bg-olympus',
      glowClass: 'glow-olympus',
      imagePath: '/phases/olympus.jpg'
    },
    {
      name: 'AURUM',
      description: 'AURUM, our golden phase, showcases the pinnacle of talent and creativity across various disciplines.',
      bgClass: 'bg-aurum',
      glowClass: 'glow-aurum',
      imagePath: '/phases/aurum.jpg'
    },
    {
      name: 'VERVE',
      description: 'The grand finale, VERVE, is a spectacular display of music, dance, and cultural extravaganza.',
      bgClass: 'bg-verve',
      glowClass: 'glow-verve',
      imagePath: '/phases/verve.jpg'
    }
  ]

  return (
    <div className="festival-phases">
      <main className="container mx-auto px-4 relative">
        {phases.map((phase, index) => (
          <div key={phase.name} className="relative">
            <section className={`festival-phase ${phase.bgClass}`}>
              <div className={`festival-phase-content ${index % 2 === 0 ? '' : 'festival-phase-content-reverse'}`}>
                <div className="festival-phase-image-container">
                  <div className={`festival-phase-image-glow ${phase.glowClass}`}></div>
                  <Image
                    src={phase.imagePath || '/default-image-path.svg'}
                    alt={`${phase.name} image`}
                    width={400}
                    height={300}
                    className="festival-phase-image"
                  />
                  <h2 className="festival-phase-title">{phase.name}</h2>
                </div>
                <p className={`festival-phase-description ${index % 2 === 0 ? 'festival-phase-description-left' : 'festival-phase-description-right'}`}>
                  {phase.description}
                </p>
              </div>
            </section>
            {index < phases.length - 1 && (
              <svg
                className="festival-phase-connector"
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
    </div>
  );
}

const companies = [
  { name: 'SAKEC', logo: '/assets/sponsors/sakec.png' },
  { name: 'Research & Development Cell', logo: '/assets/sponsors/rnd.png' },
  { name: 'Motilal Oswald', logo: '/assets/sponsors/motilaloswal.jpg' },
  { name: 'IPRC', logo: '/assets/sponsors/iprc.png' },
  { name: 'Mindicator', logo: '/assets/sponsors/mindicator.png' },
  { name: 'Vision', logo: '/assets/sponsors/vision.jpg' },
  { name: 'FB', logo: '/assets/sponsors/fb.png' },
  { name: 'mindi', logo: '/assets/sponsors/mindicator.png' },
];

// function Marquee() {
//   const [duplicatedCompanies, setDuplicatedCompanies] = useState(companies);

//   useEffect(() => {
//     setDuplicatedCompanies([...companies, ...companies]);
//   }, []);

//   return (
//     <div className="marquee-container">
//       <motion.div
//         className="marquee-content"
//         animate={{ x: ['0%', '-50%'] }}
//         transition={{
//           x: {
//             repeat: Infinity,
//             repeatType: 'loop',
//             duration: 20,
//             ease: 'linear',
//           },
//         }}
//       >
//         {duplicatedCompanies.map((company, index) => (
//           <div
//             key={`${company.name}-${index}`}
//             className="marquee-item"
//           >
//             <img
//               src={company.logo}
//               alt={`${company.name} logo`}
//               className="marquee-logo"
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

function Marquee() {
  return (
    <div className="marquee-container">
      <h3 className="marquee-title">Sponsors 2023-24</h3>
      <div className="marquee-content">
        {companies.map((company, index) => (
          <div key={`${company.name}-${index}`} className="marquee-item">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="marquee-logo"
            />
          </div>
        ))}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {companies.map((company, index) => (
          <div key={`${company.name}-${index}-duplicate`} className="marquee-item">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="marquee-logo"
                  width={100} // Specify the width
                  height={50} // Specify the height
                />
              </div>
            ))}
          </div>
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
              <Image src="/assets/banner/banner1.jpg" alt="Banner 1" width={400} height={300} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/assets/banner/banner2.jpg" alt="Banner 2" width={400} height={300} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/assets/banner/banner3.jpg" alt="Banner 3" width={400} height={300}/>
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/assets/banner/banner4.jpg" alt="Banner 4" width={400} height={300} />
            </SwiperSlide>
          </Swiper>
        </div>
        <BroadcastButton />
        <FestivalPhases />
        <Marquee />
      </div>
    </div>
  );
}
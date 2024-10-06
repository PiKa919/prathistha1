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

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
}

const sponsors: Sponsor[] = [
  { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=80&width=80", description: "Leading technology solutions provider" },
  { id: 2, name: "EduLearn", logo: "/placeholder.svg?height=80&width=80", description: "Innovative educational platform" },
  { id: 3, name: "GreenEnergy", logo: "/placeholder.svg?height=80&width=80", description: "Sustainable energy solutions" },
  { id: 4, name: "HealthPlus", logo: "/placeholder.svg?height=80&width=80", description: "Advanced healthcare services" },
  { id: 5, name: "FoodDelight", logo: "/placeholder.svg?height=80&width=80", description: "Gourmet food and catering" },
  { id: 6, name: "SportsFit", logo: "/placeholder.svg?height=80&width=80", description: "Sports equipment and fitness gear" },
  { id: 7, name: "MediaMax", logo: "/placeholder.svg?height=80&width=80", description: "Multimedia production services" },
  { id: 8, name: "TravelWise", logo: "/placeholder.svg?height=80&width=80", description: "Travel and tourism experts" },
];

export default function Home() {
  const [gridPositions, setGridPositions] = useState<{ row: number; col: number }[]>([]);

  useEffect(() => {
    const rows = 4;
    const cols = 4;
    const positions = sponsors.map(() => ({
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols)
    }));
    setGridPositions(positions);
  }, []);

  return (
    <div>
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

      <section className="sponsor-showcase">
        <div className="sponsor-title">
          <h2>Our Sponsors</h2>
        </div>
        <div className="sponsor-grid">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className="sponsor-item"
              style={{
                gridRow: gridPositions[index]?.row + 1,
                gridColumn: gridPositions[index]?.col + 1,
              }}
            >
              <div className="sponsor-logo-container">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={80}
                  height={80}
                  className="sponsor-logo"
                />
                <div className="sponsor-tooltip">
                  <h3>{sponsor.name}</h3>
                  <p>{sponsor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
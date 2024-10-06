"use client";

import React from 'react';
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './styles.css';

export default function Home() {
  return (
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
          <img src="../../assets/banner/banner1.jpg" alt="Nature 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/banner/banner2.jpg" alt="Nature 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/banner/banner3.jpg" alt="Nature 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/banner/banner4.jpg" alt="Nature 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
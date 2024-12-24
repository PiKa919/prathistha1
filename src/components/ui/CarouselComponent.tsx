'use client';

import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '80vh',
  objectFit: 'cover',
};

const CarouselComponent: React.FC = () => {
  const onChange = (currentSlide: number): void => {
    console.log('Slide changed to:', currentSlide);
  };

  return (
    <Carousel afterChange={onChange} autoplay arrows>
      <div style={imageStyle}>
        <Image
          src="/assets/banner/olympus/slide1.jpg"
          alt="Slide 1"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div style={imageStyle}>
        <Image
          src="/assets/banner/olympus/slide1.jpg"
          alt="Slide 2"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div style={imageStyle}>
        <Image
          src="/assets/banner/olympus/slide1.jpg"
          alt="Slide 3"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div style={imageStyle}>
        <Image
          src="/assets/banner/olympus/slide1.jpg"
          alt="Slide 4"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
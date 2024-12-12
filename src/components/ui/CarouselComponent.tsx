'use client';

import React from 'react';
import { Carousel } from 'antd';

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
      <div>
        <img
          style={imageStyle}
          src="https://via.placeholder.com/800x400?text=Slide+1"
          alt="Slide 1"
        />
      </div>
      <div>
        <img
          style={imageStyle}
          src="https://via.placeholder.com/800x400?text=Slide+2"
          alt="Slide 2"
        />
      </div>
      <div>
        <img
          style={imageStyle}
          src="https://via.placeholder.com/800x400?text=Slide+3"
          alt="Slide 3"
        />
      </div>
      <div>
        <img
          style={imageStyle}
          src="https://via.placeholder.com/800x400?text=Slide+4"
          alt="Slide 4"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;

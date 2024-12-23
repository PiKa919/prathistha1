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
<<<<<<< HEAD
          src="/assets/banner/olympus/slide1.jpg"
=======
          src="https://via.placeholder.com/800x400?text=Slide+1"
>>>>>>> 6da2bd9000e2cb7b28ac714e645020d90790ebaa
          alt="Slide 1"
        />
      </div>
      <div>
        <img
          style={imageStyle}
<<<<<<< HEAD
          src="/assets/banner/olympus/slide1.jpg"
=======
          src="https://via.placeholder.com/800x400?text=Slide+2"
>>>>>>> 6da2bd9000e2cb7b28ac714e645020d90790ebaa
          alt="Slide 2"
        />
      </div>
      <div>
        <img
          style={imageStyle}
<<<<<<< HEAD
          src="/assets/banner/olympus/slide1.jpg"
=======
          src="https://via.placeholder.com/800x400?text=Slide+3"
>>>>>>> 6da2bd9000e2cb7b28ac714e645020d90790ebaa
          alt="Slide 3"
        />
      </div>
      <div>
        <img
          style={imageStyle}
<<<<<<< HEAD
          src="/assets/banner/olympus/slide1.jpg"
=======
          src="https://via.placeholder.com/800x400?text=Slide+4"
>>>>>>> 6da2bd9000e2cb7b28ac714e645020d90790ebaa
          alt="Slide 4"
        />
      </div>
    </Carousel>
  );
};

<<<<<<< HEAD
export default CarouselComponent;
=======
export default CarouselComponent;
>>>>>>> 6da2bd9000e2cb7b28ac714e645020d90790ebaa

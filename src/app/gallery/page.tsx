'use client';

import React from 'react';
import HyperText from "@/components/ui/hyper-text";
import CountdownTimer from "@/components/ui/countdown";

const Page = () => {  
  const targetDate = new Date('2025-02-21T00:00:00'); // 21st February 2025

  return (
    <div className='page-content'>
      <h1>Welcome to the Gallery</h1>
      <div className="flex items-center space-x-4">
        <HyperText
          className="text-4xl font-bold text-blue dark:text-white"
          text="21st Feb, 2025" // Fixed date
        />
        <CountdownTimer targetDate={targetDate} />
      </div>
    </div>
  );
};

export default Page;
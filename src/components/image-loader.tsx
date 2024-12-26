"use client"

import Image from 'next/image';
import { useState } from 'react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ImageLoader({ src, alt, width, height, className }: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
      />
    </div>
  );
}

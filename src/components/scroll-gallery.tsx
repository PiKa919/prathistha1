'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// Define gallery images
const galleryImages = [
  '/scroll/1.webp',
  '/scroll/2.webp',
  '/scroll/3.webp',
  '/scroll/4.webp',
  '/scroll/5.webp',
  '/scroll/6.webp',
  '/scroll/7.webp',
  '/scroll/8.webp',
  '/scroll/9.webp',
  '/scroll/10.webp',
  '/scroll/11.webp',
  '/scroll/12.webp',
]

export default function ScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    let lastScrollY = window.scrollY
    let ticking = false

    const updatePosition = () => {
      if (!container || !row1 || !row2) return

      const scrollY = window.scrollY
      const containerRect = container.getBoundingClientRect()
      const speed = 0.5

      // Only animate when the container is in view
      if (
        containerRect.top < window.innerHeight &&
        containerRect.bottom > 0
      ) {
        const scrollDiff = scrollY - lastScrollY
        const translateX1 = parseFloat(row1.getAttribute('data-translateX') || '0') - scrollDiff * speed
        const translateX2 = parseFloat(row2.getAttribute('data-translateX') || '0') + scrollDiff * speed

        row1.style.transform = `translateX(${translateX1}px)`
        row2.style.transform = `translateX(${translateX2}px)`

        row1.setAttribute('data-translateX', translateX1.toString())
        row2.setAttribute('data-translateX', translateX2.toString())
      }

      lastScrollY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const initialOffset = 604; // 2 images (300px * 2 + 2px gap * 2)
    const row2StartOffset = -(302 * 1); // Move 2nd row right by 1 image width
    
    // Set initial position for both rows
    if (row1Ref.current && row2Ref.current) {
      row1Ref.current.style.transform = `translateX(-${initialOffset}px)`;
      row2Ref.current.style.transform = `translateX(-${initialOffset + row2StartOffset}px)`;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (row1Ref.current && row2Ref.current) {
        // Move both rows left starting from their respective initial positions
        row1Ref.current.style.transform = `translateX(-${initialOffset + scrolled * 0.5}px)`;
        row2Ref.current.style.transform = `translateX(-${initialOffset + row2StartOffset + scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 mb-200 text-center">
        <h1 className="text-4xl md:text-4xl font-bold mb-8">
        Chronicles From the Past
        </h1>
      </div>

      <div className="overflow-hidden">
        {/* First Row */}
        <div
          ref={row1Ref}
          className="flex gap-2 mb-4 transition-transform duration-100"
          data-translateX="0"
        >
          {galleryImages.slice(0, 6).map((src, i) => (
            <div
              key={`row1-${i}`}
              className="flex-none w-[300px] h-[200px] bg-gray-800 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {galleryImages.slice(0, 6).map((src, i) => (
            <div
              key={`overflow-${i}`}
              className="flex-none w-[300px] h-[200px] bg-gray-800 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 7}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div ref={row2Ref} className="flex gap-2 mb-4 -ml-[600px]">
          {galleryImages.slice(6, 12).map((src, i) => (
            <div
              key={`row2-${i}`}
              className="flex-none w-[300px] h-[200px] bg-gray-800 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 7}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {galleryImages.slice(6, 12).map((src, i) => (
            <div
              key={`row2-overflow-${i}`}
              className="flex-none w-[300px] h-[200px] bg-gray-800 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 13}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

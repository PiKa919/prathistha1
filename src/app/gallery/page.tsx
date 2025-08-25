"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Calendar, Eye, Camera } from 'lucide-react';

export default function Gallery() {
  const [currentYear, setCurrentYear] = useState('2023');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Gallery images with metadata
  const galleryData = {
    '2023': [
      { src: '/scroll/1.webp', alt: 'Cultural Performance 2023', description: 'Amazing dance performance that mesmerized the audience' },
      { src: '/scroll/2.webp', alt: 'Sports Event 2023', description: 'Thrilling sports competition showcasing athletic excellence' },
      { src: '/scroll/3.webp', alt: 'Technical Event 2023', description: 'Innovation and technology at its finest' },
      { src: '/scroll/4.webp', alt: 'Music Concert 2023', description: 'Melodious evening filled with beautiful music' },
      { src: '/scroll/5.webp', alt: 'Art Exhibition 2023', description: 'Creative expressions and artistic masterpieces' },
      { src: '/scroll/6.webp', alt: 'Drama Performance 2023', description: 'Captivating theatrical performance' },
      { src: '/scroll/7.webp', alt: 'Grand Opening 2023', description: 'The spectacular opening ceremony that set the stage' },
      { src: '/scroll/8.webp', alt: 'Yuva 2023', description: 'Energetic dance battles and choreographic brilliance' },
      { src: '/scroll/9.webp', alt: 'Tech Expo 2023', description: 'Cutting-edge technology exhibitions' },
      { src: '/scroll/10.webp', alt: 'Yuva 2023', description: 'Delicious cuisine from around the world' },
      { src: '/scroll/11.webp', alt: 'Awards Ceremony 2023', description: 'Celebrating excellence and achievements' },
      { src: '/scroll/12.webp', alt: 'Closing Celebration 2023', description: 'Grand finale with fireworks and memories' },
    ],
    '2024': []
  };

  const currentGallery = galleryData[currentYear as keyof typeof galleryData] || [];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % currentGallery.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? currentGallery.length - 1 : selectedImage - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              GALLERY
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Relive the magical moments from Prathistha - where memories come alive
            </p>
            
            {/* Year Selector */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-full p-2 border border-gray-700">
                {Object.keys(galleryData).map((year) => (
                  <button
                    key={year}
                    onClick={() => setCurrentYear(year)}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentYear === year
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Calendar className="inline-block w-4 h-4 mr-2" />
                    Prathistha {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-900/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-orange-400 mb-2">{currentGallery.length}</div>
                <div className="text-gray-400">Memories Captured</div>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-red-400 mb-2">{Object.keys(galleryData).length}</div>
                <div className="text-gray-400">Years Documented</div>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-pink-500" />
                </div>
                <div className="text-3xl font-bold text-pink-400 mb-2">100K+</div>
                <div className="text-gray-400">Views & Shares</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 pb-20">
        <div className="container mx-auto px-4">
          {currentGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentGallery.map((image, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => openModal(index)}
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-700 hover:border-orange-500/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/20">
                    <div className="relative aspect-square">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = image.src.replace('.webp', '.jpg');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold text-sm mb-1 line-clamp-1">{image.alt}</h3>
                        <p className="text-xs text-gray-300 line-clamp-2">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-900/30 backdrop-blur-lg rounded-2xl p-12 border border-gray-700 max-w-lg mx-auto">
                <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">Coming Soon</h3>
                <p className="text-gray-500">
                  Memories from Prathistha {currentYear} will be uploaded soon. Stay tuned!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 bg-gray-900/50 backdrop-blur-lg rounded-full p-3 text-white hover:bg-gray-800/70 transition-colors border border-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900/50 backdrop-blur-lg rounded-full p-3 text-white hover:bg-gray-800/70 transition-colors border border-gray-700"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900/50 backdrop-blur-lg rounded-full p-3 text-white hover:bg-gray-800/70 transition-colors border border-gray-700"
            >
              <ArrowRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative max-w-5xl max-h-[80vh] w-full">
              <img
                src={currentGallery[selectedImage].src}
                alt={currentGallery[selectedImage].alt}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = currentGallery[selectedImage].src.replace('.webp', '.jpg');
                }}
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white max-w-2xl">
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-2">{currentGallery[selectedImage].alt}</h3>
                <p className="text-gray-300">{currentGallery[selectedImage].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
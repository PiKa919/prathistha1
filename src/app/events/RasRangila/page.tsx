"use client";
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Star, Sparkles } from 'lucide-react';

export default function RasRangilaPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-44 left-10 text-6xl animate-bounce">🎊</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">💃</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-spin-slow">🪔</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-bounce delay-300">🌺</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-pulse delay-500">✨</div>
        <div className="absolute top-1/3 right-44 text-5xl animate-bounce delay-700">🎭</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
        <div className={`text-center max-w-6xl mx-auto transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          
          {/* Title */}
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            Ras Rangila
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-4xl text-white/90 mb-8 font-medium">
            Garba Celebration Night 🌟
          </p>
          
          {/* Coming Soon Badge */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-full px-8 py-4 border border-yellow-300/30 mb-12 inline-block">
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-6 h-6 text-yellow-400 animate-spin" />
              <span className="text-xl font-bold">Coming Soon</span>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-6">
              Get ready for the most vibrant and energetic Garba celebration! 
            </p>
            <p className="text-lg md:text-xl text-white/70">
              Join us for an evening filled with traditional Gujarati folk dance, vibrant music, and joyous festivities that bring communities together in celebration.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Traditional Music</h3>
              <p className="text-white/80">Authentic Garba beats and folk songs</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">👗</div>
              <h3 className="text-xl font-bold text-orange-300 mb-2">Traditional Attire</h3>
              <p className="text-white/80">Colorful chaniya cholis and kediyus</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">�</div>
              <h3 className="text-xl font-bold text-red-300 mb-2">Community Celebration</h3>
              <p className="text-white/80">Join the festive atmosphere and celebration</p>
            </div>
          </div>

          {/* Date Placeholder */}
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-300/30 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 text-white mb-4">
              <Calendar className="w-8 h-8 text-red-400" />
              <span className="text-2xl font-bold">Event Date</span>
            </div>
            <p className="text-xl text-white/90">
              Stay tuned for the official announcement!
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <p className="text-lg text-white/80">
              <a 
                href="https://whatsapp.com/channel/0029VaAqgWu8feKrHlmSnd2r" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 underline transition-colors duration-300"
              >
                Follow us
              </a> for updates and be the first to know when registrations open!
            </p>
          </div>

          {/* Countdown Timer Placeholder */}
          <div className="mt-16 bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
              <Star className="w-5 h-5" />
              <span className="font-medium">Announcement Countdown</span>
              <Star className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-white">
              Coming Very Soon...
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
}

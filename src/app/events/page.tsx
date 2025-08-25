"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const events = [
    {
      id: 'rasrangila',
      title: 'Ras Rangila',
      subtitle: 'Garba Celebration Night',
      description: 'Join us for the most vibrant and energetic Garba celebration! Dance to traditional beats and immerse yourself in joyous festivities.',
      status: 'Coming Soon',
      category: 'Cultural',
      image: '/verve/garba-celebration.jpg',
      link: '/events/RasRangila',
      features: ['Traditional Music', 'Cultural Dance', 'Community Celebration'],
      colors: {
        primary: 'from-orange-500 to-red-500',
        secondary: 'from-yellow-400 to-orange-500',
        accent: 'border-orange-300/30'
      }
    }
    // Add more events here as they become available
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Events
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Discover the amazing events and celebrations at Prathistha 2025
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-300">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg">Where Culture Meets Celebration</span>
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce">🎭</div>
        <div className="absolute top-40 right-20 text-5xl animate-pulse">✨</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-spin-slow">🎪</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-300">🌟</div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Event Image */}
              <div className="relative h-48 bg-gradient-to-br from-orange-600 to-red-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                {/* Placeholder for event image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-pulse">💃</div>
                </div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${event.colors.secondary} px-3 py-1 rounded-full`}>
                  <span className="text-white font-bold text-sm">{event.status}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-white font-medium text-sm">{event.category}</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-2 left-4 text-2xl animate-bounce">🎊</div>
                <div className="absolute top-8 right-16 text-xl animate-pulse">✨</div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${event.colors.primary} bg-clip-text text-transparent`}>
                  {event.title}
                </h3>
                <p className="text-lg text-white/90 mb-3 font-medium">
                  {event.subtitle}
                </p>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {event.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/80">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/70">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Date: TBA</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Time: TBA</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Venue: TBA</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Open for All</span>
                  </div>
                </div>

                {/* Call to Action */}
                <Link href={event.link}>
                  <button className={`w-full bg-gradient-to-r ${event.colors.primary} hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}>
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {/* Coming Soon Cards */}
          {[...Array(5)].map((_, index) => (
            <div
              key={`coming-soon-${index}`}
              className={`bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex items-center justify-center min-h-[400px] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(events.length + index) * 100}ms` }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🎪</div>
                <h3 className="text-xl font-bold text-white/50 mb-2">More Events</h3>
                <p className="text-white/30">Coming Soon...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-8 border border-purple-300/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated!</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Follow our WhatsApp broadcast channel to get the latest updates about all events, registrations, and announcements.
          </p>
          <a 
            href="https://whatsapp.com/channel/0029VaAqgWu8feKrHlmSnd2r" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            <span>📱</span>
            <span>Join WhatsApp Channel</span>
          </a>
        </div>
      </div>
    </div>
  );
}

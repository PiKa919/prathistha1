import React from 'react';
import CountdownTimer from '@/components/ui/count-down';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const TeaserPage = () => {
  const targetDate = new Date('2025-01-10T17:00:00');
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Pratishtha+2025+-+Biggest+Reveal+of+the+Year&dates=20250110T170000Z/20250110T180000Z&details=Don't+miss+the+biggest+reveal+of+the+year!`;

  return (
    <div className="relative min-h-screen bg-blue-950 flex items-center justify-center overflow-hidden pt-16">
      {/* Dramatic spotlight cone effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[262.5%] max-w-[1750px]">
        <div className="relative pt-[100%]">
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="spotlightGradient" cx="50%" cy="0%" r="85%" fx="50%" fy="0%">
                  <stop offset="0%" stopColor="rgb(147, 197, 253)" stopOpacity="0.175" />
                  <stop offset="40%" stopColor="rgb(147, 197, 253)" stopOpacity="0.1" />
                  <stop offset="70%" stopColor="rgb(147, 197, 253)" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="rgb(147, 197, 253)" stopOpacity="0" />
                </radialGradient>
                <filter id="blurFilter">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
              </defs>
              <path
                d="M50,0 L97,100 L3,100 Z"
                fill="url(#spotlightGradient)"
                filter="url(#blurFilter)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bright spot at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-200 rounded-full blur-xl opacity-50" />
      
      {/* Content container */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in tracking-wider">
          Get ready for the biggest reveal
          <br />
          of the year!
        </h1>
        
        <CountdownTimer targetDate={targetDate} />
        

        {/* Social media icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.instagram.com/student.council_2025/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-4xl" />
          </a>
          <a href="https://www.instagram.com/pratishtha_sakecfest" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-4xl" />
          </a>
          <a href="https://www.youtube.com/@PRATISHTHATheSAKECFest" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white text-4xl" />
          </a>
        </div>

        {/* Follow text */}
        <div className="text-blue-200 text-lg mt-2">
          Follow to not miss the reveal
        </div>

        {/* Google Calendar button */}
        <div className="mt-4">
          <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add to Google Calendar
            </button>
          </a>
        </div>
      </div>
      
      {/* Floor glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-400/10 blur-2xl" />
      
      {/* Ambient light gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent" />
    </div>
  );
};

export default TeaserPage;
"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const timeDiff = +targetDate - +new Date();
      const timeLeft = {};

      if (timeDiff > 0) {
        return {
          days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeDiff / 1000 / 60) % 60),
          seconds: Math.floor((timeDiff / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setRemainingTime(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setRemainingTime(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold text-center mb-4">It&apos;s almost time!</div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {Object.entries(remainingTime).map(([unit, value]) => (
          value !== undefined && (
            <div key={unit} className="flex flex-col items-center">
              <div className="backdrop-blur-md bg-gradient-radial from-white/15 via-white/7.5 to-transparent rounded-lg p-4 md:p-6 shadow-lg">
                <span className="text-3xl md:text-4xl font-bold">{value}</span>
              </div>
              <span className="text-xs md:text-sm mt-2 uppercase tracking-wider">{unit}</span>
            </div>
          )
        ))}
      </div>
      {!Object.keys(remainingTime).length && (
        <span className="text-2xl font-bold">Time&apos;s up!</span>
      )}
    </div>
  );
}
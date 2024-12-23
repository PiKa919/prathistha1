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

  const countdownDisplays: JSX.Element[] = [];

  Object.entries(remainingTime).forEach(([unit, value]) => {
    if (value) {
      countdownDisplays.push(
        <span key={unit}>
          {value} {unit}&nbsp;
        </span>
      );
    }
  });

  return (
    <div>
      <div>It&apos;s almost time!</div>
      {countdownDisplays.length ? countdownDisplays : <span>Time&apos;s up!</span>}
    </div>
  );
}
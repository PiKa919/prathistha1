"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll, useSpring } from "framer-motion";
import React from "react";

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed top-0 left-0 right-0 h-1 bg-blue-500", className)}
      style={{ scaleX }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";

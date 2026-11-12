"use client";

import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds for full loop
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`group relative flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex shrink-0 items-center gap-4 ${
          shouldReduceMotion
            ? "flex-wrap justify-center"
            : direction === "left"
            ? "animate-marquee"
            : "animate-marquee-reverse"
        } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>

      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center gap-4 ${
            direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
          } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}


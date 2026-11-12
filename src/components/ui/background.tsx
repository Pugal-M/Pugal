"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function Background() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    const animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Base Background Color */}
      <div className="absolute inset-0 bg-background" />

      {/* Ambient Gradient Blobs */}
      <div className="absolute -top-[25%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-google-blue/10 dark:bg-google-blue/15 blur-[120px] transform-gpu" />
      <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-google-red/10 dark:bg-google-red/15 blur-[130px] transform-gpu" />
      <div className="absolute -bottom-[20%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-google-yellow/10 dark:bg-google-yellow/10 blur-[120px] transform-gpu" />
      <div className="absolute top-[60%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-google-green/10 dark:bg-google-green/10 blur-[100px] transform-gpu" />

      {/* Cursor Following Ambient Spotlight */}
      {!shouldReduceMotion && (
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[450px] h-[450px] -ml-[225px] -mt-[225px] rounded-full bg-google-blue/10 dark:bg-white/5 blur-[90px] pointer-events-none transition-opacity duration-500"
          style={{ transform: "translate3d(-200px, -200px, 0)" }}
        />
      )}

      {/* High Performance Noise Grain Overlay */}
      <div className="noise-bg mix-blend-overlay opacity-30 dark:opacity-20" />
    </div>
  );
}

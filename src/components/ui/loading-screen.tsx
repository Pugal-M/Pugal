"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds for smooth cinematic pace

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(1, elapsed / duration);
      // Ease-out cubic curve for natural deceleration towards 100%
      const easedProgress = Math.round((1 - Math.pow(1 - progressFraction, 3)) * 100);

      setProgress(easedProgress);

      if (progressFraction < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            document.body.style.overflow = "auto";
            onComplete();
          }, 850); // Curtain animation duration
        }, 300);
      }
    };

    const animId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished ? (
        <div className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center">
          {/* Top Half Split Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-background border-b border-border/30"
          />

          {/* Bottom Half Split Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-background border-t border-border/30"
          />

          {/* Content Container (Fades out just before curtain opens) */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* SVG Stroke-Draw of "PUGAL." */}
            <div className="w-72 sm:w-96 h-28 relative flex items-center justify-center">
              <svg
                viewBox="0 0 450 120"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="pugalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4285F4" />
                    <stop offset="25%" stopColor="#EA4335" />
                    <stop offset="55%" stopColor="#FBBC05" />
                    <stop offset="80%" stopColor="#34A853" />
                    <stop offset="100%" stopColor="#EA4335" />
                  </linearGradient>
                </defs>

                {/* Animated Outline Text Stroke */}
                <motion.text
                  x="50%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill={progress > 85 ? "url(#pugalGradient)" : "transparent"}
                  stroke="url(#pugalGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1000"
                  initial={{ strokeDashoffset: 1000, fillOpacity: 0 }}
                  animate={{
                    strokeDashoffset: Math.max(0, 1000 - (progress / 100) * 1000),
                    fillOpacity: progress > 85 ? 1 : 0,
                  }}
                  transition={{
                    fillOpacity: { duration: 0.4 },
                    strokeDashoffset: { duration: 0.1, ease: "linear" },
                  }}
                  className="font-extrabold tracking-widest text-7xl select-none"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  PUGAL.
                </motion.text>
              </svg>
            </div>

            {/* Eased Counter */}
            <div className="text-5xl md:text-7xl font-extralight tabular-nums tracking-tighter text-foreground/90 mt-2">
              {progress}%
            </div>

            {/* Progress Track */}
            <div className="w-48 sm:w-64 h-[3px] bg-black/10 dark:bg-white/10 mt-6 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

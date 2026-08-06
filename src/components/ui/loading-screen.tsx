"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
            document.body.style.overflow = "auto";
          }, 800); // Wait a bit at 100% before triggering complete
          return 100;
        }
        // Random increment between 1 and 15
        return Math.min(100, prev + Math.floor(Math.random() * 15) + 1);
      });
    }, 150);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ y: 0 }}
        exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          <div className="overflow-hidden mb-6 h-12 flex">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-bold tracking-tighter flex"
            >
              <span className="text-google-blue">P</span>
              <span className="text-google-red">U</span>
              <span className="text-google-yellow">G</span>
              <span className="text-google-blue">A</span>
              <span className="text-google-green">L</span>
              <span className="text-google-red">.</span>
            </motion.div>
          </div>
          
          <div className="text-6xl md:text-8xl font-light tabular-nums tracking-tighter">
            {progress}%
          </div>

          <div className="w-64 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

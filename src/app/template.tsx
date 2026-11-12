"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 15, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -15, filter: "blur(6px)" }
      }
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}

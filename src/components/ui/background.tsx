"use client";

import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* High Performance CSS Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-google-blue/15 via-background to-google-red/15 dark:from-google-blue/10 dark:via-background dark:to-google-red/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-google-green/10 via-transparent to-google-yellow/10 dark:from-google-green/5 dark:to-google-yellow/5" />
    </div>
  );
}

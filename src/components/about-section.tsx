'use client';

import React, { useEffect, useState } from 'react';
import { Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AboutSection() {
  const phrases = [
    'Web Developer',
    'App Developer',
    'Java Developer',
    'Backend and SQL Developer',
    'Critical Thinker',
    'Problem Solver',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500); // Adjust delay as needed
    return () => clearInterval(interval);
  }, [phrases.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, delayChildren: 0.2, duration: 0.6, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="about"
      className="w-full py-24 md:py-32 lg:py-40"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ amount: 0.25, once: false }}
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6 text-center md:text-left flex-grow order-2 md:order-1"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              About <span className="title-highlight">Me</span>
            </h2>
            <h3
              className="text-2xl font-semibold tracking-tight text-foreground relative inline-flex"
              style={{ minHeight: '1.2em' /* Adjust as needed based on text height */ }}
            >
              
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="title-highlight inline-block ml-1">{phrases[index]}</motion.span></AnimatePresence>
            </h3>
            <p className="max-w-[600px] text-muted-foreground md:text-lg mx-auto md:mx-0 text-center md:text-left">
            I’m a tech enthusiast passionate about building scalable, efficient, and elegant digital solutions. Whether it's web development, mobile interfaces, or backend systems, I enjoy crafting clean, maintainable code that solves real-world problems. I’m also deeply interested in UI/UX design and love creating visually appealing, user-friendly experiences. Outside of tech, I enjoy video editing, playing online games, and exploring new technologies and trends. Always eager to learn, I thrive on experimenting with new frameworks and solving complex challenges, constantly motivated by the endless possibilities in the tech world. I’m driven to innovate and grow continuously.
            </p>
          </motion.div>

          {/* Icon */}
          <motion.div
            className="flex items-center justify-center order-1 md:order-2"
            variants={itemVariants}
          >
            <Smile className="w-12 h-12 md:w-24 md:h-24 text-primary animate-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

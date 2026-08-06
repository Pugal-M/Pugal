"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText, FolderGit2, Code, Globe, Mail } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const titles = [
  "Frontend Developer",
  "App Developer",
  "Problem Solver",
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium border-black/10 dark:border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
              <span>Available for new opportunities</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-tighter"
              >
                {Array.from("Hi, I'm").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="text-gradient-animated bg-clip-text text-transparent bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green inline-block mt-2"
                >
                  Pugalarasu M
                </motion.span>
              </motion.h1>
            </div>

            <div className="h-12 flex items-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={titleIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
                >
                  {titles[titleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="max-w-xl text-lg text-muted-foreground/80 leading-relaxed"
            >
              Hard work lays the foundation, smart work builds the future, I strive to do both. Crafting premium digital experiences through elegant code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticButton>
                <ButtonWithIcon icon={<FileText size={18} />} label="Resume" primary href="https://drive.google.com/file/d/1tohg2jaJxf2qHbh1LvuIRAWPmulECkyQ/view?usp=sharing" />
              </MagneticButton>
              <MagneticButton>
                <ButtonWithIcon icon={<FolderGit2 size={18} />} label="Projects" href="#projects" />
              </MagneticButton>
              <MagneticButton>
                <ButtonWithIcon icon={<Code size={18} />} label="GitHub" href="https://github.com/Pugal-M" />
              </MagneticButton>
              <MagneticButton>
                <ButtonWithIcon icon={<Globe size={18} />} label="LinkedIn" href="https://www.linkedin.com/in/pugalarasu-m-3aa778350/" />
              </MagneticButton>
              <MagneticButton>
                <ButtonWithIcon icon={<Mail size={18} />} label="Email" href="mailto:pugalarasu04@gmail.com" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* 3D Visuals / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center lg:justify-end w-full"
          >
            <div className="w-full max-w-md relative">
              {/* Ambient Glow/Shadow */}
              <div className="absolute inset-0 bg-white/90 dark:bg-black blur-[100px] rounded-[3rem] transform scale-105" />

              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                className="glass-card w-full aspect-[4/5] md:aspect-square rounded-3xl p-8 relative overflow-hidden group border border-black/10 dark:border-white/10 shadow-2xl"
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/image/image.png"
                    alt="Profile Photo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 contrast-105 saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-0 noise-bg mix-blend-overlay opacity-30" />

                <div className="relative h-full flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl drop-shadow-md">PM</span>
                    </div>
                    <div className="flex gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
                      <span className="w-3 h-3 rounded-full bg-google-red" />
                      <span className="w-3 h-3 rounded-full bg-google-yellow" />
                      <span className="w-3 h-3 rounded-full bg-google-green" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">VIT Vellore</h3>
                    <p className="text-white/90 font-medium drop-shadow-md">B.Tech ECE</p>
                    <div className="pt-4 border-t border-white/30 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white/80">CGPA</p>
                        <p className="text-xl font-bold text-white drop-shadow-md">8.78</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">Scholarship</p>
                        <p className="text-xl font-bold text-white drop-shadow-md">STARS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3; // Magnet strength
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function ButtonWithIcon({ icon, label, primary = false, href }: { icon: React.ReactNode; label: string; primary?: boolean; href?: string }) {
  const Component = href ? motion.a : motion.button;
  const linkProps = href ? {
    href,
    target: href.startsWith("http") ? "_blank" : undefined,
    rel: href.startsWith("http") ? "noopener noreferrer" : undefined
  } : {};

  return (
    <Component
      {...linkProps}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${primary
        ? "bg-foreground text-background hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        : "glass hover:bg-black/5 dark:hover:bg-white/10"
        }`}
    >
      {icon}
      <span>{label}</span>
      {primary && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-google-blue via-google-red to-google-yellow opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      )}
    </Component>
  );
}

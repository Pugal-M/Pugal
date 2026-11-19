"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { FileText, FolderGit2, Code, Globe, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Magnetic } from "@/components/primitives/magnetic";
import { TiltCard } from "@/components/primitives/tilt-card";
import { Reveal } from "@/components/primitives/reveal";

const roles = [
  "Frontend Developer",
  "Flutter & App Developer",
  "IoT & Systems Engineer",
  "Problem Solver",
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function ScrambleTitle() {
  const [, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const shouldReduceMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback((targetText: string) => {
    if (shouldReduceMotion) {
      setDisplayText(targetText);
      return;
    }

    let frame = 0;
    const totalFrames = 24;

    const tick = () => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index / targetText.length < progress) {
            return char;
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    tick();
  }, [shouldReduceMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => {
        const next = (prev + 1) % roles.length;
        scramble(roles[next]);
        return next;
      });
    }, 3200);

    return () => {
      clearInterval(interval);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [scramble]);

  return (
    <span className="font-mono text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground tracking-tight h-10 inline-flex items-center">
      {displayText}
      <span className="ml-1 w-2 h-5 bg-google-blue animate-pulse inline-block align-middle" />
    </span>
  );
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const headlineWords1 = ["Hi,", "I'm"];
  const nameWords = ["Pugalarasu", "M"];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col items-start space-y-6 max-w-2xl">
            
            {/* Status Badge */}
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-google-green/30 bg-google-green/5 text-sm font-medium shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-google-green" />
                </span>
                <span className="text-foreground/90 font-medium">Available for new opportunities</span>
              </div>
            </Reveal>

            {/* Masked Headline Reveal */}
            <div className="overflow-hidden">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.08]">
                <span className="block overflow-hidden pb-1">
                  {headlineWords1.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ y: "115%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: shouldReduceMotion ? 0.3 : 0.7,
                        delay: 0.2 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block mr-4 text-foreground"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>

                <span className="block overflow-hidden pt-1">
                  {nameWords.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ y: "115%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: shouldReduceMotion ? 0.3 : 0.75,
                        delay: 0.45 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block mr-4 text-gradient-animated bg-clip-text text-transparent bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Scramble Title */}
            <Reveal direction="up" delay={0.6}>
              <ScrambleTitle />
            </Reveal>

            {/* Description Paragraph */}
            <Reveal direction="up" delay={0.7}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Hard work lays the foundation, smart work builds the future, I strive to do both.
                Crafting robust software, mobile architectures, and high-performance user interfaces.
              </p>
            </Reveal>

            {/* Magnetic Action Buttons */}
            <Reveal direction="up" delay={0.85}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Magnetic strength={0.3}>
                  <ButtonWithIcon
                    icon={<FileText size={18} />}
                    label="Resume"
                    primary
                    href="https://drive.google.com/file/d/1tohg2jaJxf2qHbh1LvuIRAWPmulECkyQ/view?usp=sharing"
                  />
                </Magnetic>

                <Magnetic strength={0.3}>
                  <ButtonWithIcon
                    icon={<FolderGit2 size={18} />}
                    label="Projects"
                    onClick={() => scrollTo("projects")}
                  />
                </Magnetic>

                <Magnetic strength={0.3}>
                  <ButtonWithIcon
                    icon={<Code size={18} />}
                    label="GitHub"
                    href="https://github.com/Pugal-M"
                  />
                </Magnetic>

                <Magnetic strength={0.3}>
                  <ButtonWithIcon
                    icon={<Globe size={18} />}
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/pugalarasu-m-3aa778350/"
                  />
                </Magnetic>

                <Magnetic strength={0.3}>
                  <ButtonWithIcon
                    icon={<Mail size={18} />}
                    label="Email"
                    href="mailto:pugalarasu04@gmail.com"
                  />
                </Magnetic>
              </div>
            </Reveal>

          </div>

          {/* 3D Visual Profile Card & Ambient Halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none"
          >
            <div className="relative w-full max-w-md group">
              {/* Floating Decorative Rings */}
              <div className="absolute -inset-6 rounded-[2.5rem] border border-google-blue/20 animate-spin-slow pointer-events-none opacity-40 dark:opacity-30 -z-10" />
              <div className="absolute -inset-10 rounded-[3rem] border border-google-red/15 animate-spin-reverse-slow pointer-events-none opacity-30 dark:opacity-20 -z-10" />
              
              {/* Ambient Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-google-blue/30 via-google-red/20 to-google-yellow/20 blur-[90px] rounded-full scale-110 pointer-events-none -z-10" />

              <TiltCard
                maxAngle={9}
                perspective={1200}
                glareOpacity={0.2}
                className="glass-card w-full aspect-[4/5] rounded-3xl p-7 relative border border-white/20 dark:border-white/10 shadow-2xl"
              >
                {/* Background Photo */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/image/image-8k.webp"
                    alt="Pugalarasu M - Profile Photo"
                    fill
                    unoptimized
                    priority
                    quality={100}
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-100 contrast-[1.03] saturate-[1.04]"
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                </div>

                <div className="relative h-full flex flex-col justify-between z-10 pointer-events-none">
                  {/* Top Bar Badges */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <span className="text-white font-extrabold text-xl tracking-tight">PM</span>
                    </div>

                    <div className="flex gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 shadow-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-google-red shadow-[0_0_8px_#EA4335]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-google-yellow shadow-[0_0_8px_#FBBC05]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-google-green shadow-[0_0_8px_#34A853]" />
                    </div>
                  </div>

                  {/* Bottom Information */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                        VIT Vellore
                      </h3>
                      <p className="text-white/80 font-medium text-sm">
                        B.Tech Electronics & Communication
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/25 flex justify-between items-center text-white">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/70">CGPA</p>
                        <p className="text-xl font-extrabold tabular-nums">8.84</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wider text-white/70">Scholarship</p>
                        <p className="text-xl font-extrabold text-google-yellow">STARS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Animated Scroll-Down Indicator */}
      <Reveal direction="up" delay={1.1} className="flex justify-center mt-8">
        <button
          onClick={() => scrollTo("about")}
          aria-label="Scroll to About section"
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-none outline-none"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/80 group-hover:text-foreground transition-colors">
            Scroll Down
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/40 group-hover:border-foreground/80 flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-2 bg-google-blue rounded-full"
            />
          </div>
          <ChevronDown size={14} className="text-muted-foreground/60 group-hover:text-foreground animate-bounce" />
        </button>
      </Reveal>
    </section>
  );
}

function ButtonWithIcon({
  icon,
  label,
  primary = false,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const Component = href ? motion.a : motion.button;
  const linkProps = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : { onClick };

  return (
    <Component
      {...linkProps}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 outline-none select-none cursor-none ${
        primary
          ? "bg-foreground text-background shadow-md hover:shadow-[0_0_24px_rgba(66,133,244,0.4)]"
          : "glass hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15"
      }`}
    >
      {icon}
      <span>{label}</span>
      {primary && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-google-blue via-google-red to-google-yellow opacity-0 hover:opacity-20 blur-md transition-opacity duration-500 pointer-events-none" />
      )}
    </Component>
  );
}

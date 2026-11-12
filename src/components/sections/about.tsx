"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Award, MapPin } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { Counter } from "@/components/primitives/counter";
import { TiltCard } from "@/components/primitives/tilt-card";

export function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <Reveal direction="down">
            <span className="text-xs uppercase font-bold tracking-widest text-google-blue px-3 py-1 rounded-full bg-google-blue/10 border border-google-blue/20">
              Get To Know Me
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              About <span className="text-google-blue">Me</span>
            </h2>
          </Reveal>

          <div className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto space-y-4 leading-relaxed">
            <Reveal direction="up" delay={0.25}>
              <p>
                I&apos;m a software and app developer passionate about building scalable, efficient,
                and elegant digital solutions. Whether it&apos;s mobile apps, responsive web interfaces,
                or embedded IoT hardware, I thrive on crafting clean, maintainable systems that solve
                real-world challenges.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.35}>
              <p>
                Always eager to explore, I experiment with modern frameworks, cloud architectures,
                and cutting-edge AI agent workflows, motivated by the endless possibilities of software
                craftsmanship.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Education Journey Section */}
        <div className="mt-20">
          <Reveal direction="up">
            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="p-3 rounded-2xl bg-google-green/10 border border-google-green/20 text-google-green">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                Education <span className="text-google-green">Journey</span>
              </h3>
            </div>
          </Reveal>

          {/* Timeline Container */}
          <div ref={timelineRef} className="relative max-w-3xl mx-auto pl-8 md:pl-12">
            
            {/* Scroll-Drawn Timeline Stem */}
            <div className="absolute left-3.5 md:left-5 top-4 bottom-4 w-[3px] bg-black/10 dark:bg-white/10 rounded-full" />
            
            {/* Active Drawing Line */}
            <motion.div
              style={{ scaleY: lineHeight }}
              className="absolute left-3.5 md:left-5 top-4 bottom-4 w-[3px] bg-gradient-to-b from-google-blue via-google-green to-google-red rounded-full origin-top pointer-events-none"
            />

            <div className="space-y-12">
              
              {/* Timeline Item 1: VIT Vellore */}
              <div className="relative group">
                {/* Node indicator */}
                <span className="absolute -left-[27px] md:-left-[35px] top-4 w-5 h-5 rounded-full bg-google-blue border-4 border-background shadow-md transition-transform duration-300 group-hover:scale-125" />

                <Reveal direction="left" delay={0.15}>
                  <TiltCard
                    maxAngle={5}
                    className="glass-card p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-google-blue/40 transition-all duration-300 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className="text-xs uppercase tracking-wider font-semibold text-google-blue px-3 py-1 rounded-full bg-google-blue/10 border border-google-blue/20 w-fit">
                        Undergraduate
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        2021 – 2025
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold tracking-tight mb-2">
                      B.Tech Electronics &amp; Communication Engineering
                    </h4>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                      <MapPin size={16} className="text-google-red" />
                      <span>Vellore Institute of Technology (VIT), Vellore</span>
                    </div>

                    {/* Stats & Badges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* CGPA Counter Card */}
                      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col justify-center">
                        <span className="text-xs uppercase font-medium text-muted-foreground">Cumulative CGPA</span>
                        <div className="text-3xl font-extrabold text-foreground mt-1">
                          <Counter value={8.84} decimals={2} duration={2} />
                          <span className="text-sm font-normal text-muted-foreground ml-1">/ 10.0</span>
                        </div>
                      </div>

                      {/* STARS Scholarship Badge with Shimmer */}
                      <div className="relative overflow-hidden p-4 rounded-2xl bg-google-yellow/10 border border-google-yellow/30 flex flex-col justify-center group/shimmer">
                        {/* Shimmer sweep animation */}
                        <div className="absolute inset-0 -translate-x-full group-hover/shimmer:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase font-semibold text-google-yellow">Merit Scholarship</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-google-yellow/20 text-foreground font-semibold">100% Grant</span>
                        </div>
                        <div className="text-xl font-bold text-foreground mt-1 flex items-center gap-1.5">
                          <span>STARS Scholar</span>
                          <span className="text-google-yellow">✦</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Support The Advancement of Rural Students</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              </div>

              {/* Timeline Item 2: Pre-University */}
              <div className="relative group">
                {/* Node indicator */}
                <span className="absolute -left-[27px] md:-left-[35px] top-4 w-5 h-5 rounded-full bg-google-red border-4 border-background shadow-md transition-transform duration-300 group-hover:scale-125" />

                <Reveal direction="left" delay={0.3}>
                  <TiltCard
                    maxAngle={5}
                    className="glass-card p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-google-red/40 transition-all duration-300 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className="text-xs uppercase tracking-wider font-semibold text-google-red px-3 py-1 rounded-full bg-google-red/10 border border-google-red/20 w-fit">
                        Higher Secondary
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        Pre-University
                      </span>
                    </div>

                    <h4 className="text-xl font-bold tracking-tight mb-2">
                      Pre-University &amp; Higher Secondary Education
                    </h4>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                      <Award size={16} className="text-google-yellow" />
                      <span>Government Higher Secondary School</span>
                    </div>

                    {/* District Topper Badge with Shimmer */}
                    <div className="relative overflow-hidden p-4 rounded-2xl bg-google-red/10 border border-google-red/30 flex items-center justify-between group/shimmer">
                      <div className="absolute inset-0 -translate-x-full group-hover/shimmer:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                      <div>
                        <span className="text-xs uppercase font-semibold text-google-red">Academic Distinction</span>
                        <h5 className="text-xl font-bold text-foreground mt-0.5">District Topper</h5>
                        <p className="text-xs text-muted-foreground">Ranked 1st in the district for academic excellence</p>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-google-red/20 flex items-center justify-center text-google-red shrink-0 ml-4">
                        <Award size={22} />
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

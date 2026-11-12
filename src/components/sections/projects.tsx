"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { TiltCard } from "@/components/primitives/tilt-card";
import { Reveal } from "@/components/primitives/reveal";

const filterCategories = [
  "All",
  "Flutter & Mobile",
  "IoT & Embedded",
  "Games",
] as const;

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Flutter & Mobile") {
      return project.technologies.some((t) =>
        ["Flutter", "Dart", "Firebase", "Hive", "Provider"].includes(t)
      ) && project.id !== "dino-run-game";
    }
    if (activeFilter === "IoT & Embedded") {
      return project.technologies.some((t) =>
        ["ESP32", "ESP32-CAM", "8051 Microcontroller", "Arduino (C/C++)", "IoT", "Embedded C"].includes(t)
      );
    }
    if (activeFilter === "Games") {
      return project.technologies.includes("Flame Engine") || project.id === "dino-run-game";
    }
    return true;
  });

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Reveal direction="down">
            <span className="text-xs uppercase font-bold tracking-widest text-google-red px-3 py-1 rounded-full bg-google-red/10 border border-google-red/20 inline-flex items-center gap-1.5">
              <Sparkles size={14} />
              Portfolio Showcase
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Featured <span className="text-google-red">Work</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready mobile applications, intelligent IoT hardware integrations,
              and interactive real-time systems.
            </p>
          </Reveal>

          {/* Filter Bar with Animated Pill */}
          <Reveal direction="up" delay={0.3} className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl glass border border-black/10 dark:border-white/10">
              {filterCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors duration-200 outline-none select-none cursor-none ${
                      isActive ? "text-background dark:text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="project-filter-pill"
                        className="absolute inset-0 bg-foreground text-background dark:bg-white/15 rounded-xl shadow-md"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Projects List with Animated Layout Reordering */}
        <motion.div layout className="space-y-28 md:space-y-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const hasValidGithub =
                Boolean(project.githubUrl) &&
                project.githubUrl !== "#" &&
                project.githubUrl.trim().length > 1;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-10 lg:gap-14 items-center`}
                >
                  {/* Visual Side with 3D Tilt & Glare */}
                  <div className="w-full lg:w-3/5">
                    <Link href={`/projects/${project.id}`}>
                      <TiltCard
                        maxAngle={6}
                        perspective={1200}
                        glareOpacity={0.25}
                        className="w-full aspect-[16/9] rounded-3xl p-1 relative group cursor-none shadow-2xl"
                      >
                        {/* Glowing ambient border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-google-red to-google-yellow opacity-40 blur-xl group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                        <div
                          data-cursor="view"
                          className="relative w-full h-full bg-background rounded-[22px] overflow-hidden border border-black/10 dark:border-white/10 z-10"
                        >
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 65vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          {/* Hover Slide-Up Tech Tags Bar */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-wrap gap-1.5 z-20">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TiltCard>
                    </Link>
                  </div>

                  {/* Content Description Side */}
                  <div className="w-full lg:w-2/5 space-y-6">
                    <Reveal direction={isEven ? "right" : "left"}>
                      <div className="space-y-3">
                        <span className="text-xs uppercase font-bold tracking-widest text-google-blue">
                          {project.date || "Featured Project"}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </Reveal>

                    {/* Tech Badges */}
                    <Reveal direction="up" delay={0.15}>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.technologies.map((tag) => (
                          <span
                            key={tag}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/80 hover:border-google-blue/50 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Reveal>

                    {/* Action Buttons */}
                    <Reveal direction="up" delay={0.25}>
                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Link href={`/projects/${project.id}`} className="w-full sm:w-auto">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:shadow-[0_0_20px_rgba(66,133,244,0.35)] transition-all cursor-none"
                          >
                            <span>View Details</span>
                            <ArrowRight size={16} />
                          </motion.div>
                        </Link>

                        {hasValidGithub && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 font-semibold text-sm transition-all cursor-none"
                          >
                            <Code size={16} />
                            <span>Code</span>
                          </motion.a>
                        )}
                      </div>
                    </Reveal>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

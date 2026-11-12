"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code, Calendar, Download, Sparkles, Layers, Cpu, Database, Smartphone } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";

interface ProjectType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sliderImages?: string[];
  githubUrl?: string;
  longDescription: string;
  technologies: string[];
  downloadUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  date?: string;
  paperUrl?: string;
}

export function ProjectDetailView({ project }: { project: ProjectType }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroImageRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const hasValidGithub =
    Boolean(project.githubUrl) &&
    project.githubUrl !== "#" &&
    project.githubUrl!.trim().length > 1;

  // Determine architecture diagram type
  const isIotProject = project.technologies.some((t) =>
    ["ESP32", "ESP32-CAM", "8051 Microcontroller", "Arduino (C/C++)", "IoT"].includes(t)
  );

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Back Link */}
        <Reveal direction="down">
          <Link href="/#projects">
            <motion.div
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-black/10 dark:hover:bg-white/10 transition-colors mb-10 cursor-none border border-black/10 dark:border-white/10"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to Projects</span>
            </motion.div>
          </Link>
        </Reveal>

        {/* Header Information */}
        <header className="space-y-6 mb-12">
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {project.date && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium">
                  <Calendar size={14} className="text-google-blue" />
                  <span>{project.date}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-blue" />
                <span className="w-2 h-2 rounded-full bg-google-red" />
                <span className="w-2 h-2 rounded-full bg-google-yellow" />
                <span className="w-2 h-2 rounded-full bg-google-green" />
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-foreground/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </header>

        {/* Parallax Hero Image Container */}
        <div
          ref={heroImageRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-border shadow-2xl bg-muted"
        >
          <motion.div
            style={shouldReduceMotion ? {} : { y: heroY, scale: heroScale }}
            className="relative w-full h-full"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section className="space-y-4">
              <Reveal direction="up">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles size={20} className="text-google-yellow" />
                  Project Overview
                </h2>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </p>
              </Reveal>
            </section>

            {/* Interactive Animated Architecture Diagram */}
            <section className="space-y-6 pt-4 border-t border-border">
              <Reveal direction="up">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Layers size={20} className="text-google-blue" />
                    System Architecture Flow
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    End-to-end data transmission and processing pipeline.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.15}>
                <div className="glass-card p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Node 1 */}
                    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full md:w-1/3">
                      <div className="w-12 h-12 rounded-2xl bg-google-blue/15 text-google-blue flex items-center justify-center mb-3">
                        {isIotProject ? <Cpu size={24} /> : <Smartphone size={24} />}
                      </div>
                      <span className="text-xs uppercase tracking-wider font-bold text-google-blue mb-1">
                        {isIotProject ? "Edge / Sensing" : "Client UI"}
                      </span>
                      <h4 className="font-bold text-sm">
                        {isIotProject ? (project.technologies[0] || "ESP32 Node") : "Flutter Mobile App"}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isIotProject ? "Sensor data & camera stream" : "Interactive state & view layer"}
                      </p>
                    </div>

                    {/* Animated Connection Arrow 1 */}
                    <div className="hidden md:flex flex-col items-center justify-center flex-1 relative px-2">
                      <div className="w-full h-[2px] bg-gradient-to-r from-google-blue via-google-red to-google-yellow relative overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="absolute top-0 bottom-0 w-12 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                        />
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground mt-2">
                        {isIotProject ? "HTTP / WebSockets" : "REST / Stream"}
                      </span>
                    </div>

                    {/* Node 2 */}
                    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full md:w-1/3">
                      <div className="w-12 h-12 rounded-2xl bg-google-red/15 text-google-red flex items-center justify-center mb-3">
                        <Database size={24} />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-bold text-google-red mb-1">
                        Cloud &amp; Inference
                      </span>
                      <h4 className="font-bold text-sm">
                        {project.technologies.find((t) => ["Supabase", "Firebase", "Node.js"].includes(t)) || "Cloud Backend"}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Realtime database &amp; async pipeline
                      </p>
                    </div>

                    {/* Animated Connection Arrow 2 */}
                    <div className="hidden md:flex flex-col items-center justify-center flex-1 relative px-2">
                      <div className="w-full h-[2px] bg-gradient-to-r from-google-red via-google-yellow to-google-green relative overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                          className="absolute top-0 bottom-0 w-12 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                        />
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground mt-2">
                        Live Sync
                      </span>
                    </div>

                    {/* Node 3 */}
                    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full md:w-1/3">
                      <div className="w-12 h-12 rounded-2xl bg-google-green/15 text-google-green flex items-center justify-center mb-3">
                        <Smartphone size={24} />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-bold text-google-green mb-1">
                        End Consumer
                      </span>
                      <h4 className="font-bold text-sm">
                        {isIotProject ? "Mobile App / LCD Display" : "User Device"}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Instant notifications &amp; live UI
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Draggable Screenshot Gallery Carousel */}
            {project.sliderImages && project.sliderImages.length > 0 && (
              <section className="space-y-6 pt-4 border-t border-border">
                <Reveal direction="up">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Screenshot Gallery</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Drag horizontally to inspect app screens</p>
                    </div>
                  </div>
                </Reveal>

                <div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing rounded-2xl">
                  <motion.div
                    drag="x"
                    dragConstraints={carouselRef}
                    className="flex gap-4 pb-2"
                  >
                    {project.sliderImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="relative min-w-[280px] sm:min-w-[340px] aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex-shrink-0 shadow-md"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 280px, 340px"
                          className="object-cover pointer-events-none"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}

            {/* Video Demo (if available) */}
            {project.videoUrl && (
              <section className="space-y-4 pt-4 border-t border-border">
                <Reveal direction="up">
                  <h2 className="text-2xl font-bold">
                    {project.videoTitle || "Video Demonstration"}
                  </h2>
                  {project.videoDescription && (
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.videoDescription}
                    </p>
                  )}
                </Reveal>

                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
                  <iframe
                    src={project.videoUrl}
                    title={project.videoTitle || "Video Demonstration"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </section>
            )}

          </div>

          {/* Sticky Sidebar / Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-3xl glass border border-black/10 dark:border-white/10 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold">Project Details</h3>

              <div className="space-y-3">
                {hasValidGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 transition-all cursor-none group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-google-blue/15 text-google-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Code size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Source Code</p>
                      <p className="text-xs text-muted-foreground">View repository on GitHub</p>
                    </div>
                  </a>
                )}

                {project.downloadUrl && (
                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 transition-all cursor-none group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-google-red/15 text-google-red flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Download size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Download App / APK</p>
                      <p className="text-xs text-muted-foreground">Direct build release</p>
                    </div>
                  </a>
                )}

                {!hasValidGithub && !project.downloadUrl && (
                  <p className="text-muted-foreground text-sm p-2">
                    Source code or download links are restricted for this build.
                  </p>
                )}
              </div>

              {/* Technologies List */}
              <div className="pt-4 border-t border-border">
                <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-3">
                  Technologies Applied
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

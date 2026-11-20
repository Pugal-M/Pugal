"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Code,
  Calendar,
  Download,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Smartphone,
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
} from "lucide-react";
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Screenshot Gallery state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

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

  const checkScrollability = useCallback(() => {
    const el = galleryRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    // Calculate current visible slide
    const slideWidth = 340 + 16;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(0, index), (project.sliderImages?.length || 1) - 1));
  }, [project.sliderImages]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  // Keyboard navigation for screenshot lightbox
  useEffect(() => {
    if (!selectedImage || !project.sliderImages) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        const currIdx = project.sliderImages!.indexOf(selectedImage);
        const prevIdx = (currIdx - 1 + project.sliderImages!.length) % project.sliderImages!.length;
        setSelectedImage(project.sliderImages![prevIdx]);
      } else if (e.key === "ArrowRight") {
        const currIdx = project.sliderImages!.indexOf(selectedImage);
        const nextIdx = (currIdx + 1) % project.sliderImages!.length;
        setSelectedImage(project.sliderImages![nextIdx]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, project.sliderImages]);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = galleryRef.current;
    if (!el) return;
    const scrollAmount = Math.max(340, el.clientWidth * 0.7);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = galleryRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = galleryRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }
    el.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (img: string) => {
    if (!hasMoved) {
      setSelectedImage(img);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Back Link */}
        <Reveal direction="down">
          <Link href="/#projects">
            <motion.div
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.96 }}
              data-cursor="pointer"
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

            {/* Draggable & Navigable Screenshot Gallery */}
            {project.sliderImages && project.sliderImages.length > 0 && (
              <section className="space-y-6 pt-4 border-t border-border">
                <Reveal direction="up">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span>Screenshot Gallery</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-google-blue/10 text-google-blue border border-google-blue/20">
                          {project.sliderImages.length} {project.sliderImages.length === 1 ? "Screen" : "Screens"}
                        </span>
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Scroll, drag horizontally, or use arrow buttons to inspect screens
                      </p>
                    </div>

                    {/* Navigation Buttons & Progress Indicator */}
                    {project.sliderImages.length > 1 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground tabular-nums px-2">
                          {activeIndex + 1} / {project.sliderImages.length}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => scrollByDirection("left")}
                            disabled={!canScrollLeft}
                            aria-label="Previous screenshot"
                            data-cursor="pointer"
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                              canScrollLeft
                                ? "glass border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground active:scale-95"
                                : "opacity-30 border-transparent text-muted-foreground cursor-not-allowed"
                            }`}
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => scrollByDirection("right")}
                            disabled={!canScrollRight}
                            aria-label="Next screenshot"
                            data-cursor="pointer"
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                              canScrollRight
                                ? "glass border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground active:scale-95"
                                : "opacity-30 border-transparent text-muted-foreground cursor-not-allowed"
                            }`}
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>

                {/* Gallery Scroll Track */}
                <div className="relative group/gallery">
                  {/* Left edge shadow gradient */}
                  {canScrollLeft && (
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none rounded-l-2xl" />
                  )}

                  {/* Right edge shadow gradient */}
                  {canScrollRight && (
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none rounded-r-2xl" />
                  )}

                  <div
                    ref={galleryRef}
                    data-lenis-prevent="true"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className={`flex gap-4 overflow-x-auto scroll-smooth scrollbar-none rounded-2xl select-none p-1 transition-colors ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    style={{
                      scrollSnapType: isDragging ? "none" : "x proximity",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {project.sliderImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCardClick(img)}
                        data-cursor="pointer"
                        className="group/card relative min-w-[280px] sm:min-w-[340px] aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex-shrink-0 shadow-md hover:shadow-xl transition-all hover:border-google-blue/40"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 280px, 340px"
                          className="object-cover pointer-events-none transition-transform duration-500 group-hover/card:scale-105"
                        />
                        {/* Subtle Zoom Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white pointer-events-none">
                          <div className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transform translate-y-2 group-hover/card:translate-y-0 transition-transform">
                            <ZoomIn size={18} />
                          </div>
                          <span className="text-xs font-semibold drop-shadow-md">Click to view</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Dots for quick scanning */}
                {project.sliderImages.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {project.sliderImages.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => {
                          const el = galleryRef.current;
                          if (!el) return;
                          const slideWidth = 340 + 16;
                          el.scrollTo({ left: dotIdx * slideWidth, behavior: "smooth" });
                        }}
                        data-cursor="pointer"
                        aria-label={`Go to screenshot ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === activeIndex
                            ? "w-6 bg-google-blue"
                            : "w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
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
                    data-cursor="pointer"
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
                    data-cursor="pointer"
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

                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                    className="flex items-center gap-3 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 transition-all cursor-none group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-google-green/15 text-google-green flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Documentation / Paper</p>
                      <p className="text-xs text-muted-foreground">View official summary PDF</p>
                    </div>
                  </a>
                )}

                {!hasValidGithub && !project.downloadUrl && !project.paperUrl && (
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

      {/* Screenshot Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close screenshot preview"
              data-cursor="pointer"
              className="absolute top-2 right-2 sm:-top-12 sm:right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="relative w-full h-full max-h-[82vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={selectedImage}
                alt="Screenshot preview full size"
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Lightbox Next/Prev Navigation */}
            {project.sliderImages && project.sliderImages.length > 1 && (
              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = project.sliderImages!.indexOf(selectedImage);
                    const prevIdx = (currIdx - 1 + project.sliderImages!.length) % project.sliderImages!.length;
                    setSelectedImage(project.sliderImages![prevIdx]);
                  }}
                  data-cursor="pointer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-white/80 text-sm font-medium tabular-nums">
                  {project.sliderImages.indexOf(selectedImage) + 1} / {project.sliderImages.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = project.sliderImages!.indexOf(selectedImage);
                    const nextIdx = (currIdx + 1) % project.sliderImages!.length;
                    setSelectedImage(project.sliderImages![nextIdx]);
                  }}
                  data-cursor="pointer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

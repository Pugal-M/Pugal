"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, ArrowRight } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Featured <span className="text-google-red">Work</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={project.title} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>

                {/* Visual Side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? -10 : 10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                  className="w-full lg:w-3/5"
                >
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    glarePosition="all"
                    className="w-full aspect-[16/9] rounded-3xl p-1 relative overflow-hidden group"
                  >
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-google-red to-google-yellow opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative w-full h-full bg-background rounded-[22px] overflow-hidden border border-black/10 dark:border-white/10 z-10">
                      <Image 
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60" />
                    </div>
                  </Tilt>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-2/5 space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                    <Link href={`/projects/${project.id}`} className="w-full sm:w-auto">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
                      >
                        <ArrowRight size={18} />
                        View Details
                      </motion.div>
                    </Link>
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-all"
                      >
                        <Code size={18} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

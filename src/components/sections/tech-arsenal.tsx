"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/primitives/marquee";
import { Reveal } from "@/components/primitives/reveal";
import { StaggerChildren, StaggerItem } from "@/components/primitives/stagger-children";
import { Cpu } from "lucide-react";

interface SkillItem {
  name: string;
  category: "Languages" | "Mobile & Frontend" | "Backend & Cloud" | "Core CS & Embedded" | "Tools & AI";
  color: string;
}

const allSkills: SkillItem[] = [
  // Languages
  { name: "Java", category: "Languages", color: "text-google-red" },
  { name: "Python", category: "Languages", color: "text-google-blue" },
  { name: "C / C++", category: "Languages", color: "text-google-green" },
  { name: "Dart", category: "Languages", color: "text-google-yellow" },
  { name: "JavaScript", category: "Languages", color: "text-google-blue" },
  { name: "Embedded C", category: "Languages", color: "text-foreground" },
  { name: "Assembly", category: "Languages", color: "text-google-red" },

  // Mobile & Frontend
  { name: "Flutter", category: "Mobile & Frontend", color: "text-google-blue" },
  { name: "React", category: "Mobile & Frontend", color: "text-google-blue" },
  { name: "HTML / CSS", category: "Mobile & Frontend", color: "text-google-green" },
  { name: "Flame Engine", category: "Mobile & Frontend", color: "text-google-red" },

  // Backend & Cloud
  { name: "SQL", category: "Backend & Cloud", color: "text-google-blue" },
  { name: "Firebase", category: "Backend & Cloud", color: "text-google-yellow" },
  { name: "Supabase", category: "Backend & Cloud", color: "text-google-green" },
  { name: "Node.js", category: "Backend & Cloud", color: "text-google-green" },
  { name: "REST APIs", category: "Backend & Cloud", color: "text-google-blue" },

  // Core CS & Embedded
  { name: "DSA", category: "Core CS & Embedded", color: "text-google-yellow" },
  { name: "OOP", category: "Core CS & Embedded", color: "text-google-blue" },
  { name: "DBMS", category: "Core CS & Embedded", color: "text-google-green" },
  { name: "Computer Networks", category: "Core CS & Embedded", color: "text-google-red" },
  { name: "System Design", category: "Core CS & Embedded", color: "text-foreground" },
  { name: "Digital Electronics", category: "Core CS & Embedded", color: "text-google-yellow" },
  { name: "Microcontrollers", category: "Core CS & Embedded", color: "text-google-green" },

  // Tools & AI
  { name: "VS Code", category: "Tools & AI", color: "text-google-blue" },
  { name: "GitHub", category: "Tools & AI", color: "text-foreground" },
  { name: "Linux", category: "Tools & AI", color: "text-google-yellow" },
  { name: "Antigravity", category: "Tools & AI", color: "text-google-blue" },
  { name: "MCPs", category: "Tools & AI", color: "text-google-red" },
];

const categories = [
  "All",
  "Languages",
  "Mobile & Frontend",
  "Backend & Cloud",
  "Core CS & Embedded",
  "Tools & AI",
] as const;

// Split for dual marquees
const marqueeRow1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const marqueeRow2 = allSkills.slice(Math.ceil(allSkills.length / 2));

export function TechArsenalSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills =
    selectedCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal direction="down">
            <span className="text-xs uppercase font-bold tracking-widest text-google-yellow px-3 py-1 rounded-full bg-google-yellow/10 border border-google-yellow/20">
              Tech Stack &amp; Competencies
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Technical <span className="text-google-yellow">Arsenal</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit spanning mobile engineering, modern web technologies,
              cloud backends, and low-level embedded hardware.
            </p>
          </Reveal>
        </div>

        {/* Dual Infinite Marquee Rows */}
        <div className="space-y-6 mb-20 max-w-6xl mx-auto">
          {/* Row 1: Left */}
          <Marquee direction="left" speed={28} pauseOnHover={true}>
            {marqueeRow1.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </Marquee>

          {/* Row 2: Right */}
          <Marquee direction="right" speed={32} pauseOnHover={true}>
            {marqueeRow2.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </Marquee>
        </div>

        {/* Interactive Category Filter Explorer */}
        <div className="max-w-4xl mx-auto">
          <Reveal direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl glass border border-black/10 dark:border-white/10 mb-12">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors duration-200 outline-none select-none ${
                      isSelected
                        ? "text-background dark:text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-skill-tab"
                        className="absolute inset-0 bg-foreground text-background dark:bg-white/15 rounded-xl shadow-md"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Filtered Grid with Spring Stagger */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerChildren
                staggerDelay={0.04}
                className="flex flex-wrap justify-center gap-3.5"
              >
                {filteredSkills.map((skill) => (
                  <StaggerItem key={skill.name}>
                    <motion.div
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 rounded-2xl glass border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-200 flex items-center gap-2.5 shadow-sm group cursor-none"
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${skill.color} shadow-[0_0_10px_currentColor] group-hover:scale-125 transition-transform`}
                      />
                      <span className="font-semibold text-sm text-foreground/90">
                        {skill.name}
                      </span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function SkillChip({ skill }: { skill: SkillItem }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-3 rounded-full glass border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors shadow-sm cursor-none select-none">
      <span
        className={`w-2 h-2 rounded-full ${skill.color} shadow-[0_0_8px_currentColor]`}
      />
      <span className="font-medium text-sm whitespace-nowrap text-foreground/90">
        {skill.name}
      </span>
    </div>
  );
}

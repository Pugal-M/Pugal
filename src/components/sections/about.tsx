"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin } from "lucide-react";

const skills = [
  // Languages
  { name: "Java", category: "Languages", color: "text-google-red" },
  { name: "Python", category: "Languages", color: "text-google-blue" },
  { name: "C / C++", category: "Languages", color: "text-google-green" },
  { name: "Dart", category: "Languages", color: "text-google-yellow" },
  { name: "JavaScript", category: "Languages", color: "text-google-blue" },
  { name: "Embedded C", category: "Languages", color: "text-foreground" },
  { name: "Assembly", category: "Languages", color: "text-google-red" },
  
  // Frontend
  { name: "Flutter", category: "Frontend", color: "text-google-blue" },
  { name: "HTML / CSS", category: "Frontend", color: "text-google-green" },
  
  // Backend
  { name: "SQL", category: "Backend", color: "text-google-blue" },
  { name: "Firebase", category: "Backend", color: "text-google-yellow" },
  { name: "Supabase", category: "Backend", color: "text-google-green" },
  
  // Frameworks
  { name: "React", category: "Frameworks", color: "text-google-blue" },
  { name: "Node.js", category: "Frameworks", color: "text-google-green" },
  { name: "Flame Engine", category: "Frameworks", color: "text-google-red" },
  
  // Tools
  { name: "VS Code", category: "Tools", color: "text-google-blue" },
  { name: "GitHub", category: "Tools", color: "text-foreground" },
  { name: "Linux", category: "Tools", color: "text-google-yellow" },
  { name: "APIs", category: "Tools", color: "text-google-green" },
  { name: "Antigravity", category: "Tools", color: "text-google-blue" },
  { name: "MCPs", category: "Tools", color: "text-google-red" },
  
  // Computer Science & Core
  { name: "DSA", category: "CS Core", color: "text-google-yellow" },
  { name: "OOP", category: "CS Core", color: "text-google-blue" },
  { name: "DBMS", category: "CS Core", color: "text-google-green" },
  { name: "Networks", category: "CS Core", color: "text-google-red" },
  { name: "System Design", category: "CS Core", color: "text-foreground" },
  { name: "Digital Electronics", category: "Core", color: "text-google-yellow" },
  { name: "Microcontrollers", category: "Core", color: "text-google-green" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            About <span className="text-google-blue">Me</span>
          </h2>
          <div className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>
              I’m a tech enthusiast passionate about building scalable, efficient, and elegant digital solutions. Whether it's web development, mobile interfaces, or backend systems, I enjoy crafting clean, maintainable code that solves real-world problems.
            </p>
            <p>
              Always eager to learn, I thrive on experimenting with new frameworks and solving complex challenges, constantly motivated by the endless possibilities in the tech world. I’m driven to innovate and grow continuously.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block lg:w-full h-full"
          >
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-google-green" size={32} />
              Education Journey
            </h3>
            
            <div className="relative pl-8 border-l-2 border-black/10 dark:border-white/10 space-y-12">
              <div className="relative">
                <span className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-google-blue border-4 border-background" />
                <div className="glass-card p-6">
                  <h4 className="text-2xl font-bold">B.Tech Electronics & Communication Engineering</h4>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2 mb-4">
                    <MapPin size={16} />
                    <span>VIT Vellore</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="bg-black/5 dark:bg-white/5 rounded-lg px-4 py-2 border border-black/10 dark:border-white/10">
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="text-2xl font-bold text-foreground">8.78</p>
                    </div>
                    <div className="bg-google-yellow/10 rounded-lg px-4 py-2 border border-google-yellow/20">
                      <p className="text-sm text-google-yellow">Scholarship</p>
                      <p className="text-xl font-bold text-foreground">STARS Scholar</p>
                      <p className="text-xs text-google-yellow/70">100% Scholarship</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-google-red border-4 border-background" />
                <div className="glass-card p-6">
                  <h4 className="text-xl font-bold">Pre-University Education</h4>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2 mb-4">
                    <Award size={16} />
                    <span>Government School</span>
                  </div>
                  <div className="bg-google-red/10 rounded-lg px-4 py-3 border border-google-red/20 inline-block">
                    <p className="font-semibold text-foreground">District Topper</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-google-yellow">✦</span>
              Technical Arsenal
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {skills.map((skill, index) => {
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.05 }}
                    className="relative"
                  >
                    <div
                      className="bg-black/5 dark:bg-white/10 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:scale-110 transition-all duration-300 shadow-sm flex items-center gap-2 cursor-none"
                    >
                      <span className={`w-2 h-2 rounded-full ${skill.color} shadow-[0_0_10px_currentColor]`} />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Trophy, Award, FileBadge, Star } from "lucide-react";

const achievements = [
  {
    title: "Patent Filed",
    description: "Smart Flood Route Navigator System",
    icon: <FileBadge size={32} className="text-google-blue" />,
    color: "bg-google-blue/10 border-google-blue/30"
  },
  {
    title: "TCS Offer",
    description: "Campus Placement - Tata Consultancy Services",
    icon: <Award size={32} className="text-google-red" />,
    color: "bg-google-red/10 border-google-red/30"
  },
  {
    title: "CTS Offer",
    description: "Campus Placement - Cognizant Technology Solutions",
    icon: <Award size={32} className="text-google-yellow" />,
    color: "bg-google-yellow/10 border-google-yellow/30"
  },
  {
    title: "STARS Scholarship",
    description: "100% Scholarship at VIT Vellore",
    icon: <Star size={32} className="text-google-green" />,
    color: "bg-google-green/10 border-google-green/30"
  },
  {
    title: "District Topper",
    description: "Highest marks in Pre-University Education",
    icon: <Trophy size={32} className="text-google-blue" />,
    color: "bg-google-blue/10 border-google-blue/30"
  }
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Milestones & <span className="text-google-yellow">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognitions and offers that highlight my dedication to excellence.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                rotate: Math.random() * 4 - 2 
              }}
              className={`glass-card p-8 rounded-3xl w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex flex-col items-center text-center border ${achievement.color} transition-colors duration-300 relative group overflow-hidden`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 w-1/2 h-full -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
              
              <div className="mb-6 p-4 rounded-full bg-background shadow-inner">
                {achievement.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{achievement.title}</h3>
              <p className="text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

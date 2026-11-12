"use client";

import { Trophy, Award, FileBadge, Star } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { TiltCard } from "@/components/primitives/tilt-card";

const achievements = [
  {
    title: "Patent Filed",
    description: "Smart Flood Route Navigator System",
    icon: <FileBadge size={32} className="text-google-blue" />,
    borderColor: "border-google-blue/30 hover:border-google-blue/60",
    glowColor: "from-google-blue/15",
  },
  {
    title: "TCS Offer",
    description: "Campus Placement - Tata Consultancy Services",
    icon: <Award size={32} className="text-google-red" />,
    borderColor: "border-google-red/30 hover:border-google-red/60",
    glowColor: "from-google-red/15",
  },
  {
    title: "CTS Offer",
    description: "Campus Placement - Cognizant Technology Solutions",
    icon: <Award size={32} className="text-google-yellow" />,
    borderColor: "border-google-yellow/30 hover:border-google-yellow/60",
    glowColor: "from-google-yellow/15",
  },
  {
    title: "STARS Scholarship",
    description: "100% Scholarship Grant at VIT Vellore",
    icon: <Star size={32} className="text-google-green" />,
    borderColor: "border-google-green/30 hover:border-google-green/60",
    glowColor: "from-google-green/15",
  },
  {
    title: "District Topper",
    description: "Highest marks in Pre-University Education",
    icon: <Trophy size={32} className="text-google-blue" />,
    borderColor: "border-google-blue/30 hover:border-google-blue/60",
    glowColor: "from-google-blue/15",
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <Reveal direction="down">
            <span className="text-xs uppercase font-bold tracking-widest text-google-yellow px-3 py-1 rounded-full bg-google-yellow/10 border border-google-yellow/20">
              Honors &amp; Recognitions
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Milestones &amp; <span className="text-google-yellow">Achievements</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Key accolades, competitive offers, and scholarship recognitions earned through
              dedication and technical rigor.
            </p>
          </Reveal>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.title} direction="up" delay={index * 0.09}>
              <TiltCard
                maxAngle={8}
                perspective={1000}
                glareOpacity={0.2}
                className={`glass-card p-8 rounded-3xl flex flex-col items-center text-center border ${achievement.borderColor} transition-colors duration-300 relative group overflow-hidden shadow-xl cursor-none`}
              >
                {/* Ambient glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <div className="mb-6 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2 tracking-tight">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

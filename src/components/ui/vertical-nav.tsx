"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function VerticalNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when the section is in the middle of the screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-3 rounded-full bg-transparent border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <div key={id} className="relative group flex items-center justify-center">
              {/* Tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1 rounded-md bg-foreground text-background text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
              </div>
              
              <button
                onClick={() => scrollToSection(id)}
                aria-label={`Scroll to ${label}`}
                className="relative flex items-center justify-center w-8 h-8 rounded-full outline-none group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors"
              >
                <div 
                  className={`rounded-full transition-all duration-300 ease-out ${
                    isActive 
                      ? 'w-3 h-3 bg-foreground scale-110' 
                      : 'w-2 h-2 bg-foreground/30 group-hover:bg-foreground/50'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

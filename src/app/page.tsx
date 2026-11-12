"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TechArsenalSection } from "@/components/sections/tech-arsenal";
import { ProjectsSection } from "@/components/sections/projects";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <main className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <AboutSection />
        <TechArsenalSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}

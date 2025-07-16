import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { CertificatesSection } from '@/components/certificates-section'; // Added import
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper';

export default function Home() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificatesSection /> {/* Added CertificatesSection */}
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageTransitionWrapper>
  );
}

    
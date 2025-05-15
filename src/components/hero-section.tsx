
'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = {
  github: "https://github.com/Pugal-M",
  linkedin: "https://www.linkedin.com/in/pugalarasu-m-3aa778350/",
  twitter: "https://twitter.com/your-username",
};

const phrasesToCycle = ["Frontend Developer", "App Developer", "Problem Solver"];
const TYPING_SPEED = 120; // Milliseconds per character
const ERASING_SPEED = 80; // Milliseconds per character
const DELAY_BETWEEN_PHRASES = 2000; // Milliseconds to pause after typing/erasing

export function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleType = () => {
      const currentPhrase = phrasesToCycle[currentPhraseIndex];

      if (isDeleting) {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrasesToCycle.length);
        }
      } else {
        // Typing
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          timeoutId = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN_PHRASES);
          return; // Return early to prevent immediate re-trigger of handleType
        }
      }
    };

    // Set timeout for the next action (typing or deleting)
    timeoutId = setTimeout(handleType, isDeleting ? ERASING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or re-render
  }, [displayedText, isDeleting, currentPhraseIndex]);


  const handleDownloadCV = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    // CV download logic remains, can be enhanced if needed
  };

  return (
    <section id="hero" className="relative w-full py-16 md:py-24 lg:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">

          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] glowing-border-container rounded-full shadow-2xl">
              <div className="relative w-full h-full border-4 border-background rounded-full overflow-hidden shadow-inner">
                <Image
                  src="/image/edit.png"
                  alt="Pugalarasu M"
                  data-ai-hint="professional portrait developer"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Hello, It's Me</h3>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
              Pugalarasu M
            </h1>
            
            {/* Grouping "And I'm a" and the animated text */}
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground flex items-center justify-center md:justify-start">
                And I'm a
              </h3>
              {/* Animated text on a new line */}
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground h-12 sm:h-14 md:h-16 lg:h-[72px] flex items-center justify-center md:justify-start mt-1">
                <span className="title-highlight">
                  {displayedText}
                  {/* Blinking cursor */}
                  <span 
                    className="inline-block w-[3px] bg-primary animate-blink ml-1"
                    style={{ 
                      height: 'calc(1em * 0.8)', // Adjust cursor height based on current font size
                      verticalAlign: 'text-bottom' // Align cursor with text baseline
                    }}
                  ></span>
                </span>
              </h2>
            </div>

            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
            Hard work lays the foundation, smart work builds the future, I strive to do both.
            </p>

            <div className="flex justify-center md:justify-start space-x-4 pt-4">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:translate-y-[-2px] transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:translate-y-[-2px] transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:translate-y-[-2px] transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            <div className="pt-6 flex justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground transition-colors rounded-md shadow-md"
              >
                <a
                  href="https://docs.google.com/document/d/1NuugFXrUXb5kUTr6hfHqOn38njNVaUQDBcte_f8Vmbk/edit?usp=drive_link"
                  download
                  onClick={handleDownloadCV}
                  className="flex items-center gap-2"
                >
                  <FileDown className="w-5 h-5" /> Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Code, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; 

const socialLinks = {
  github: "https://github.com/Pugal-M",
  linkedin: "https://www.linkedin.com/in/pugalarasu-m-3aa778350/",
  leetcode: "https://leetcode.com/u/Pugalarasu/",
};

const phrasesToCycle = ["Frontend Developer", "App Developer", "Problem Solver"];
const TYPING_SPEED = 120; 
const ERASING_SPEED = 80; 
const DELAY_BETWEEN_PHRASES = 2000; 

const HERO_ANIMATION_PLAYED_KEY = 'heroEntryAnimationPlayed_v4'; // Key for session storage

export function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Initialize playEntryAnimations to false to match server render
  const [playEntryAnimations, setPlayEntryAnimations] = useState<boolean>(false);

  useEffect(() => {
    // Client-side check for session storage after mount
    const animationPlayedInSession = sessionStorage.getItem(HERO_ANIMATION_PLAYED_KEY);
    if (!animationPlayedInSession) {
      setPlayEntryAnimations(true); // Enable animations for this session
      sessionStorage.setItem(HERO_ANIMATION_PLAYED_KEY, 'true'); // Mark as played
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleType = () => {
      const currentPhrase = phrasesToCycle[currentPhraseIndex];

      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrasesToCycle.length);
        }
      } else {
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        } else {
          timeoutId = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN_PHRASES);
          return; 
        }
      }
    };

    timeoutId = setTimeout(handleType, isDeleting ? ERASING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeoutId); 
  }, [displayedText, isDeleting, currentPhraseIndex]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="hero" className="relative w-full py-16 md:py-24 lg:py-28 bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">

          <div className="flex justify-center items-center order-1 md:order-2">
            <motion.div 
              className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] glowing-border-container rounded-full shadow-2xl"
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={buttonVariants} 
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.1 : 0 , type: "spring", stiffness: 150 }}
            >
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
            </motion.div>
          </div>

          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <motion.h3
              className="text-2xl font-semibold tracking-tight text-foreground"
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.2 : 0 }}
            >
              Hello, It's Me
            </motion.h3>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.3 : 0 }}
            >
              Pugalarasu M
            </motion.h1>
            
            <motion.div
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.4 : 0 }}
            >
              <h3 className="text-2xl font-semibold tracking-tight text-foreground flex items-center justify-center md:justify-start">
                And I'm a
              </h3>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground h-12 sm:h-14 md:h-16 lg:h-[72px] flex items-center justify-center md:justify-start mt-1">
                <span className="title-highlight">
                  {displayedText}
                  <span 
                    className="inline-block w-[3px] bg-primary animate-blink ml-1"
                    style={{ 
                      height: 'calc(1em * 0.8)', 
                      verticalAlign: 'text-bottom' 
                    }}
                  ></span>
                </span>
              </h2>
            </motion.div>

            <motion.p
              className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0"
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.5 : 0 }}
            >
            Hard work lays the foundation, smart work builds the future, I strive to do both.
            </motion.p>

            <motion.div
              className="flex justify-center md:justify-start space-x-4 pt-4"
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.6 : 0 }}
            >
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:translate-y-[-2px] transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:translate-y-[-2px] transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="hover:translate-y-[-2px] transition-all duration-300">
                <Code className="h-5 w-5" />
              </a>
            </motion.div>

            <motion.div
              className="pt-6 flex justify-center md:justify-start"
              initial={playEntryAnimations ? "hidden" : false}
              animate="visible"
              variants={buttonVariants}
              transition={{ duration: 0.5, delay: playEntryAnimations ? 0.7 : 0, type: "spring", stiffness: 150 }}
            >
              <Button
                asChild
                size="lg"
                className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground transition-colors rounded-md shadow-md"
              >
                <a
                  href="https://drive.google.com/file/d/1WOxKZCDw2WLBzt5D36LDsOnqt8q6CMb2/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileDown className="w-5 h-5" /> Download CV
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

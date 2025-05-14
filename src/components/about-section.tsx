'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Smile } from 'lucide-react';

export function AboutSection() {
  const phrases = useMemo(() => [
    'Web Developer',
    'App Developer',
    'Java Developer',
    'Backend and SQL Developer',
    'Critical Thinker',
    'Problem Solver',
  ], []);

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  // Function to scramble a given string
  const scrambleText = (text: string) =>
    text
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        const rand = Math.floor(Math.random() * 26);
        return String.fromCharCode(97 + rand);
      })
      .join('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScrambling(true);
      let scrambleCount = 0;

      const scrambleInterval = setInterval(() => {
        setDisplayText(scrambleText(phrases[index]));
        scrambleCount++;

        if (scrambleCount > 4) {
          clearInterval(scrambleInterval);
          const nextIndex = (index + 1) % phrases.length;
          setDisplayText(phrases[nextIndex]);
          setIndex(nextIndex);
          setIsScrambling(false);
        }
      }, 80);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, phrases]);

  return (
    <section id="about" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left flex-grow order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              About <span className="title-highlight">Me</span>
            </h2>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground relative">
              I&apos;m a{' '}
              <span className="title-highlight">
                {displayText}
              </span>
              !
            </h3>
            <p className="max-w-[600px] text-muted-foreground md:text-lg mx-auto md:mx-0 text-center md:text-left">
              {/* Replace with your real content */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex delectus iste,
              aliquid officia quasi aliquam deleniti consequuntur suscipit ducimus tenetur
              dolores vel modi veniam ratione! Nisi praesentium delectus fugiat
              officiis cupiditate in illum, modi unde recusandae, molestiae excepturi
              voluptatibus temporibus.
            </p>
          </div>

          {/* Icon */}
          <div className="animate-bounce flex items-center justify-center order-1 md:order-2">
            <Smile className="w-12 h-12 md:w-24 md:h-24 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  type?: "words" | "chars";
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export function SplitText({
  text,
  type = "words",
  className = "",
  wordClassName = "",
  charClassName = "",
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  once = true,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  if (type === "words") {
    const words = text.split(" ");
    return (
      <span className={`inline-block ${className}`}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
          >
            <motion.span
              initial={{ y: "115%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once, margin: "-40px" }}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // Chars mode
  const characters = Array.from(text);
  return (
    <span className={`inline-block ${className}`}>
      {characters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block overflow-hidden align-top"
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once, margin: "-40px" }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${charClassName}`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}


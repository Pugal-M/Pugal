"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, useReducedMotion, motion } from "framer-motion";

interface CounterProps {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  value,
  decimals = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const motionValue = useMotionValue(shouldReduceMotion ? value : 0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  const rounded = useTransform(springValue, (latest) =>
    shouldReduceMotion ? value.toFixed(decimals) : latest.toFixed(decimals)
  );

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, shouldReduceMotion]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

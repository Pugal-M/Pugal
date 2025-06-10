
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
};

// noAnimationVariants is no longer needed if all transitions are smooth
// const noAnimationVariants = {
//   initial: { opacity: 1 },
//   animate: { opacity: 1, transition: { duration: 0 } },
//   exit: { opacity: 0, transition: { duration: 0 } },
// };

export function PageTransitionWrapper({ children }: Props) {
  const pathname = usePathname();

  // Always use fadeVariants for a consistent smooth animation
  const currentVariants = fadeVariants;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // Scroll restoration is handled by Next.js default behavior
      }}
    >
      <motion.div
        key={pathname}
        variants={currentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}


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

const noAnimationVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } }, // Exit quickly for no-animation pages
};

export function PageTransitionWrapper({ children }: Props) {
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isProjectPage = pathname.startsWith('/project/');

  // Determine which variants to use based on the current page
  const currentVariants = (isHomePage || isProjectPage) ? noAnimationVariants : fadeVariants;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // Scroll restoration is handled by Next.js default behavior
        // No explicit window.scrollTo(0, 0);
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


'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

// Enhanced variants for a smoother fade and slide transition
const pageTransitionVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: 'easeIn' } },
};


export function PageTransitionWrapper({ children }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // Scroll restoration is handled by Next.js default behavior
        window.scrollTo(0, 0);
      }}
    >
      <motion.div
        key={pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

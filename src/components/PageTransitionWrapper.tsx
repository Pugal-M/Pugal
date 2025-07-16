
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

// Simplified variants for the main page container
const pageContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
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
        variants={pageContainerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

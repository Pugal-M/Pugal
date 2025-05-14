'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';
// Removed useEffect, useRef, and useLoading as they are no longer needed

interface Props {
  children: React.ReactNode;
}

// Removed usePrevious hook as it's not used anymore

export function PageTransitionWrapper({ children }: Props) {
  const pathname = usePathname();
  // Removed prevPathname and loading context logic

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // No loading to hide
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          // No loading to hide
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

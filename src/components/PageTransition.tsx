import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, routeKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 1.05,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

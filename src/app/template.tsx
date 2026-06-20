"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.27, 0, 0.51, 1] }}
    >
      {children}
    </motion.div>
  );
}

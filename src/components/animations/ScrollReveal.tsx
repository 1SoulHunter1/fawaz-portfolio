"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const initial: Record<string, number> = { opacity: 0 };
  const animate: Record<string, number> = { opacity: 1 };

  if (direction === "up") {
    initial.y = 40;
    animate.y = 0;
  } else if (direction === "left") {
    initial.x = 40;
    animate.x = 0;
  } else if (direction === "right") {
    initial.x = -40;
    animate.x = 0;
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

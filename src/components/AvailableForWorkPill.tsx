"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function AvailableForWorkPill() {
  return (
    <Link
      href="#contact"
      className="flex items-center gap-2 py-1 pr-1 pl-2"
    >
      <span className="whitespace-nowrap text-base font-light text-[rgb(208,255,113)]">
        Available for work
      </span>
      <div className="relative flex h-6 w-6 items-center justify-center">
        <motion.div
          className="absolute rounded-full bg-[rgb(11,222,102)]"
          style={{ width: 40, height: 40, filter: "blur(8px)" }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative h-1.5 w-1.5 rounded-full bg-[rgb(11,222,102)]" />
      </div>
    </Link>
  );
}

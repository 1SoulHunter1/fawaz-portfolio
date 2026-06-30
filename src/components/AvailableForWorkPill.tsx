"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AvailableForWorkPill() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="#contact"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="flex items-center gap-2 py-1 pr-1 pl-2"
    >
      <div className="h-6 overflow-hidden">
        <motion.div
          animate={{ rotateX: hovered ? -90 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ transformPerspective: 1200, transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
          className="flex flex-col"
        >
          <span className="flex h-6 items-center whitespace-nowrap text-base leading-none font-light text-white">
            Available for work
          </span>
          <span
            className="flex h-6 items-center whitespace-nowrap text-base leading-none font-light text-[#d0ff71]"
            style={{ transform: "rotateX(90deg)", transformOrigin: "50% 0%" }}
          >
            Available for work
          </span>
        </motion.div>
      </div>
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

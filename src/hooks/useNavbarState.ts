"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const SCROLL_THRESHOLD = 70;

export function useNavbarState() {
  const { scrollY } = useScroll();
  const [expanded, setExpanded] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setExpanded(latest < SCROLL_THRESHOLD);
  });

  return { expanded };
}

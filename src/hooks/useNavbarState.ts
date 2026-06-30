"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

// Direction-based: the navbar expands when scrolling UP and minimizes when
// scrolling DOWN — anywhere on the page, not gated on scroll position. A small
// threshold ignores sub-pixel jitter; because lastY only advances when we act,
// slow same-direction scrolls accumulate past the threshold and still trigger.
const THRESHOLD = 10;

export function useNavbarState() {
  const { scrollY } = useScroll();
  const [expanded, setExpanded] = useState(true);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY.current;
    if (Math.abs(delta) < THRESHOLD) return;
    setExpanded(delta < 0); // up → expand, down → minimize
    lastY.current = latest;
  });

  return { expanded };
}

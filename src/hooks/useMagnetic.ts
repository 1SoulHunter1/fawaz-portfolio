"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) * strength);
      rawY.set((e.clientY - cy) * strength);
    };

    const onPointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [strength, rawX, rawY]);

  return { ref, x, y };
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const DOT_SIZE = 16;
const EXPANDED_SIZE = 70;
const IMAGE_SIZE = 200;

function isTouch(): boolean {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

type CursorVariant = "default" | "arrow" | "blend" | "image";

function getVariant(target: EventTarget | null): {
  variant: CursorVariant;
  imageSrc?: string;
} {
  let el = target as HTMLElement | null;
  while (el) {
    const attr = el.dataset?.cursor as CursorVariant | undefined;
    if (attr === "image") {
      return { variant: "image", imageSrc: el.dataset.cursorImage };
    }
    if (attr === "arrow" || attr === "blend") return { variant: attr };
    el = el.parentElement;
  }
  return { variant: "default" };
}

export function MouseFollower() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [visible, setVisible] = useState(false);

  // Raw mouse coordinates; the spring trails slightly behind these.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 500, damping: 40, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const hasMoved = useRef(false);

  const sync = useCallback(
    (target: EventTarget | null) => {
      const { variant: v, imageSrc: src } = getVariant(target);
      setVariant(v);
      setImageSrc(src ?? "");
    },
    [],
  );

  useEffect(() => {
    if (isTouch()) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!hasMoved.current) {
        // Jump the spring to the first known position so it doesn't fly in
        // from the top-left corner on first reveal.
        hasMoved.current = true;
        x.jump(e.clientX);
        y.jump(e.clientY);
        setVisible(true);
      }

      sync(e.target);
    };

    const onLeave = () => setVisible(false);
    const onEnter = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      x.jump(e.clientX);
      y.jump(e.clientY);
      hasMoved.current = true;
      setVisible(true);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, x, y, sync]);

  if (typeof window !== "undefined" && isTouch()) return null;

  const isImage = variant === "image";
  const isArrow = variant === "arrow";
  const isBlend = variant === "blend";

  const size = isImage ? IMAGE_SIZE : isArrow ? EXPANDED_SIZE : DOT_SIZE;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
        width: size,
        height: size,
        borderRadius: isImage ? 20 : 9999,
        backgroundColor: isImage ? "transparent" : "#d0ff71",
        mixBlendMode: isBlend ? "color-burn" : "normal",
        transition:
          "width 0.3s ease-out, height 0.3s ease-out, border-radius 0.3s ease-out, background-color 0.3s ease-out, mix-blend-mode 0.3s ease-out, opacity 0.2s ease-out",
        willChange: "transform",
      }}
    >
      <svg
        className="-rotate-45 transition-opacity duration-300"
        style={{ opacity: isArrow ? 1 : 0 }}
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#303030"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {isImage && imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          aria-hidden="true"
        />
      ) : null}
    </motion.div>
  );
}

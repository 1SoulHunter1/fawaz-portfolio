"use client";

import { useEffect, useRef, useCallback } from "react";

const LERP = 0.12;
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
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const currentVariant = useRef<CursorVariant>("default");
  const rafId = useRef(0);

  const applyVariant = useCallback(
    (v: CursorVariant, imageSrc?: string) => {
      const dot = dotRef.current;
      const arrow = arrowRef.current;
      const img = imgRef.current;
      if (!dot) return;
      currentVariant.current = v;

      if (v === "image") {
        dot.style.width = `${IMAGE_SIZE}px`;
        dot.style.height = `${IMAGE_SIZE}px`;
        dot.style.borderRadius = "20px";
        dot.style.mixBlendMode = "normal";
        dot.style.backgroundColor = "transparent";
        if (arrow) arrow.style.opacity = "0";
        if (img) {
          img.src = imageSrc ?? "";
          img.style.opacity = "1";
        }
      } else if (v === "arrow") {
        dot.style.width = `${EXPANDED_SIZE}px`;
        dot.style.height = `${EXPANDED_SIZE}px`;
        dot.style.borderRadius = "9999px";
        dot.style.mixBlendMode = "normal";
        dot.style.backgroundColor = "#d0ff71";
        if (arrow) arrow.style.opacity = "1";
        if (img) img.style.opacity = "0";
      } else if (v === "blend") {
        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        dot.style.borderRadius = "9999px";
        dot.style.mixBlendMode = "color-burn";
        dot.style.backgroundColor = "#d0ff71";
        if (arrow) arrow.style.opacity = "0";
        if (img) img.style.opacity = "0";
      } else {
        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        dot.style.borderRadius = "9999px";
        dot.style.mixBlendMode = "normal";
        dot.style.backgroundColor = "#d0ff71";
        if (arrow) arrow.style.opacity = "0";
        if (img) img.style.opacity = "0";
      }
    },
    [],
  );

  useEffect(() => {
    if (isTouch()) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lerp = reducedMotion ? 1 : LERP;

    document.documentElement.classList.add("cursor-hidden");

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible.current && dotRef.current) {
        visible.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        dotRef.current.style.opacity = "1";
      }

      const { variant: v, imageSrc } = getVariant(e.target);
      if (v !== currentVariant.current || (v === "image" && imgRef.current?.src !== imageSrc)) {
        applyVariant(v, imageSrc);
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      visible.current = false;
    };

    const onEnter = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        dotRef.current.style.opacity = "1";
        visible.current = true;
      }
    };

    const tick = () => {
      if (visible.current && dotRef.current) {
        pos.current.x += (mouse.current.x - pos.current.x) * lerp;
        pos.current.y += (mouse.current.y - pos.current.y) * lerp;
        dotRef.current.style.transform = `translate(-50%, -50%) translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [applyVariant]);

  if (typeof window !== "undefined" && isTouch()) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[13] flex items-center justify-center overflow-hidden bg-[#d0ff71] opacity-0 transition-[width,height,mix-blend-mode,border-radius,background-color] duration-300 ease-out"
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: "9999px",
        willChange: "transform",
      }}
    >
      <svg
        ref={arrowRef}
        className="-rotate-45 opacity-0 transition-opacity duration-300"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
    </div>
  );
}

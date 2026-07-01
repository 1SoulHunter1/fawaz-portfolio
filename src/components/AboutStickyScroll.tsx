"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const CARD_IMAGES = [
  "/images/cms/About_1.png",
  "/images/cms/MZuXaRoDIChJ0C6y8Fwit9E0.jpeg",
  "/images/cms/yb0fdGmcyv8ZYyS3IOlIWNVC7RI.jpeg",
  "/images/cms/VRQgkdWsjawSg1qpCm45HfSY1I.jpeg",
];

// Card geometry measured directly from portavia.framer.website/about (framer-jDuwQ):
// 340×476, border-radius 20px, vertically centered in the pinned viewport.
const CARD_WIDTH = 340;
const CARD_HEIGHT = 476;

export function AboutStickyScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const stripY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.19, 0.53, 0.56, 0.79, 0.83, 1],
    [0, 0, -CARD_HEIGHT, -CARD_HEIGHT, -CARD_HEIGHT * 2, -CARD_HEIGHT * 2, -CARD_HEIGHT * 3, -CARD_HEIGHT * 3],
  );

  return (
    <div ref={wrapperRef} className="relative">
      {/* Desktop: two-column sticky layout */}
      <div className="hidden lg:block">
        <div className="mx-auto flex max-w-[1200px]">
          {/* Left: content sections scroll naturally */}
          <div className="w-[560px] shrink-0">{children}</div>

          {/* Right: single pinned image card, crossfading between photos */}
          <div className="w-[640px] shrink-0 px-10">
            <div className="sticky top-0 flex h-screen items-center justify-center">
              <div
                className="relative overflow-hidden rounded-[20px]"
                style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
              >
                <motion.div style={{ y: stripY }}>
                  {CARD_IMAGES.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`Portrait ${i + 1}`}
                      width={CARD_WIDTH}
                      height={CARD_HEIGHT}
                      className="block object-cover"
                      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                      priority={i === 0}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: just the content, no sticky images */}
      <div className="lg:hidden">{children}</div>
    </div>
  );
}

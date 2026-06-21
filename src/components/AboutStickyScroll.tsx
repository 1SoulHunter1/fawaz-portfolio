"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const CARD_IMAGES = [
  "/images/cms/qrxY8NagVO40NBrdhFEGgFR3PYY.jpg",
  "/images/cms/MZuXaRoDIChJ0C6y8Fwit9E0.jpeg",
  "/images/cms/yb0fdGmcyv8ZYyS3IOlIWNVC7RI.jpeg",
  "/images/cms/VRQgkdWsjawSg1qpCm45HfSY1I.jpeg",
];

const CARD_HEIGHT = 476;
const TOTAL_STACK_HEIGHT = CARD_IMAGES.length * CARD_HEIGHT;

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

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(TOTAL_STACK_HEIGHT - CARD_HEIGHT)],
  );
  const y = useSpring(rawY, { stiffness: 300, damping: 40 });

  return (
    <div ref={wrapperRef} className="relative">
      {/* Desktop: two-column sticky layout */}
      <div className="hidden lg:block">
        <div className="mx-auto flex max-w-[1200px]">
          {/* Left: content sections scroll naturally */}
          <div className="w-[560px] shrink-0">{children}</div>

          {/* Right: sticky image stack (640px with 40px padding each side) */}
          <div className="w-[640px] shrink-0 px-10">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
              <motion.div
                className="flex flex-col"
                style={{ y }}
              >
                {CARD_IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className="h-[476px] w-[340px] shrink-0 overflow-hidden rounded-[20px]"
                  >
                    <Image
                      src={src}
                      alt={`Portrait ${i + 1}`}
                      width={340}
                      height={476}
                      className="h-full w-full object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: just the content, no sticky images */}
      <div className="lg:hidden">{children}</div>
    </div>
  );
}

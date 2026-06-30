"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { HeroPanel } from "@/components/HeroPanel";
import { ServicePanel } from "@/components/ServicePanel";
import { AboutPanel } from "@/components/AboutPanel";
import { WaveHandIcon } from "@/components/icons";

export function StickyScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 300, damping: 35 };
  const rotateYSpring = { stiffness: 500, damping: 40 };
  // Transform curves sampled directly from portavia.framer.website's card at
  // every 0.10 of scroll progress (51-point DOM measurement; exact measured values,
  // not rounded). All four channels share a knee at progress 0.50: rotateY accelerates
  // (slope 300.9°→379.1°/unit), rotateZ peaks at ~9.99°, scale bottoms at ~0.900,
  // and translateX reaches 340px and plateaus.
  const PROGRESS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] as const;
  const rawRotateY = useTransform(scrollYProgress, [...PROGRESS], [
    0, 30.045, 60.268, 90.313, 120.358, 150.451, 188.338, 226.226, 264.338, 302.226,
    340,
  ]);
  const rawTranslateX = useTransform(scrollYProgress, [...PROGRESS], [
    0, 68.101, 136.608, 204.709, 272.811, 340, 340, 340, 340, 340, 340,
  ]);
  const rawScale = useTransform(scrollYProgress, [...PROGRESS], [
    1, 0.97997, 0.95982, 0.93979, 0.91976, 0.90024, 0.92018, 0.94012, 0.96018,
    0.98012, 1,
  ]);
  const rawRotateZ = useTransform(scrollYProgress, [...PROGRESS], [
    0, 2.003, 4.018, 6.021, 8.024, 9.988, 8.991, 7.994, 6.991, 5.994, 5,
  ]);
  const rotateY = useSpring(rawRotateY, rotateYSpring);
  const translateX = useSpring(rawTranslateX, springConfig);
  const cardScale = useSpring(rawScale, springConfig);
  const rotateZ = useSpring(rawRotateZ, springConfig);

  const badgeOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);

  // Badge carousel: Hi 2s → crossfade 70ms → Wave 3.9s → crossfade 70ms → repeat
  // Even cycle = Hi visible, odd cycle = Wave visible
  const [cycle, setCycle] = useState(0);
  const showWave = cycle % 2 === 1;
  useEffect(() => {
    const duration = showWave ? 3900 : 2000;
    const timeout = setTimeout(() => setCycle((c) => c + 1), duration);
    return () => clearTimeout(timeout);
  }, [cycle, showWave]);

  return (
    <div ref={wrapperRef} className="relative h-[300vh]">
      {/* Sticky layer — card stays pinned at center */}
      <div className="relative z-[2] h-[300vh] pointer-events-none">
        <div className="sticky top-0 hidden h-screen items-center justify-center overflow-hidden lg:flex">
          {/* Card flip container — smaller on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative h-[340px] w-[240px] lg:h-[476px] lg:w-[340px]"
            style={{
              perspective: 1200,
            }}
          >
            <motion.div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                rotateY,
                x: translateX,
                scale: cardScale,
                rotate: rotateZ,
              }}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[20px]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src="/images/portrait-front.png"
                  alt="Portrait front"
                  width={340}
                  height={476}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              {/* Back face — pre-rotated 180° */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[20px]"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Image
                  src="/images/portrait-back.png"
                  alt="Portrait back"
                  width={340}
                  height={476}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Hi badge — carousel with "Hi" text and wave hand SVG */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.8,
                }}
                className="bg-[#d0ff71] absolute -bottom-4 -left-4 z-10 h-[80px] w-[80px] overflow-hidden rounded-full lg:-bottom-[62px] lg:-left-[62px] lg:h-[123px] lg:w-[123px]"
                style={{
                  backfaceVisibility: "visible",
                  z: 30,
                  opacity: badgeOpacity,
                }}
              >
                {/* Inner carousel — opacity crossfade between Hi and Wave */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative h-[40px] w-[40px] lg:h-[62px] lg:w-[62px]">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: showWave ? 0 : 1 }}
                      transition={{ duration: 0.07 }}
                    >
                      <span className="font-sans text-[26px] font-normal text-[#303030] lg:text-[40px]">
                        Hi
                      </span>
                    </motion.div>
                    <motion.div
                      key={cycle}
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: showWave ? 1 : 0 }}
                      transition={{ duration: 0.07 }}
                    >
                      <WaveHandIcon className="h-[40px] w-[40px] lg:h-[62px] lg:w-[62px]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content layer — scrolls naturally within the 300vh wrapper */}
      <div className="absolute inset-0 z-[1] flex flex-col">
        <HeroPanel />
        <ServicePanel />
        <AboutPanel />
      </div>
    </div>
  );
}

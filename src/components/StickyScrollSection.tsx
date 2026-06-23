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
  const rawRotateY = useTransform(scrollYProgress, [0, 0.73, 1], [0, 340, 340]);
  const rawTranslateX = useTransform(scrollYProgress, [0, 0.36, 1], [0, 340, 340]);
  const rawScale = useTransform(scrollYProgress, [0, 0.32, 0.73, 1], [1, 0.904, 1, 1]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.32, 0.73, 1], [0, 9.6, 5, 5]);
  const rotateY = useSpring(rawRotateY, springConfig);
  const translateX = useSpring(rawTranslateX, springConfig);
  const cardScale = useSpring(rawScale, springConfig);
  const rotateZ = useSpring(rawRotateZ, springConfig);

  const badgeOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);

  // Carousel state: cycle between "Hi" text and wave hand icon
  // Original timing: ~3.2s show Hi → 0.6s transition → ~1.6s show wave → 0.6s transition → repeat (~6s cycle)
  const [showWave, setShowWave] = useState(false);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setShowWave((prev) => {
        // If currently showing Hi, switch to wave after 3200ms; if showing wave, switch back after 1600ms
        timeout = setTimeout(cycle, prev ? 1600 : 3200);
        return !prev;
      });
    };
    timeout = setTimeout(cycle, 3200); // initial delay before first switch
    return () => clearTimeout(timeout);
  }, []);

  // Wave animation key counter — increments each time showWave becomes true
  // to force CSS animation restart via React key remount
  const [waveAnimKey, setWaveAnimKey] = useState(0);
  useEffect(() => {
    if (showWave) {
      setWaveAnimKey((k) => k + 1);
    }
  }, [showWave]);

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
            className="pointer-events-auto relative h-[340px] w-[240px] lg:h-[476px] lg:w-[340px]"
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
                  src="/images/portrait-front.jpg"
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
                  src="/images/portrait-back.jpeg"
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
                className="absolute -bottom-4 -left-4 z-10 h-[80px] w-[80px] overflow-hidden rounded-full bg-[#d0ff71] lg:-bottom-[62px] lg:-left-[62px] lg:h-[123px] lg:w-[123px]"
                style={{
                  backfaceVisibility: "visible",
                  z: 30,
                  opacity: badgeOpacity,
                }}
              >
                {/* Inner carousel — centered 62×62 content area */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-[40px] w-[40px] overflow-hidden lg:h-[62px] lg:w-[62px]">
                    <motion.div
                      className="flex flex-col"
                      animate={{ y: showWave ? "-50%" : "0%" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* "Hi" text */}
                      <div className="flex h-[40px] w-[40px] items-center justify-center lg:h-[62px] lg:w-[62px]">
                        <span className="font-sans text-[26px] font-normal text-[#303030] lg:text-[40px]">
                          Hi
                        </span>
                      </div>
                      {/* Wave hand SVG — CSS keyframe rotation, key remounts to restart each wave cycle */}
                      <div
                        key={waveAnimKey}
                        className={`flex h-[40px] w-[40px] items-center justify-center lg:h-[62px] lg:w-[62px] ${showWave ? "animate-wave-rotation" : ""}`}
                      >
                        <WaveHandIcon className="h-[40px] w-[40px] lg:h-[62px] lg:w-[62px]" />
                      </div>
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

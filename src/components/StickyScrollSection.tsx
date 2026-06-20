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
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rawTranslateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 340, 340]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 5]);
  const rotateY = useSpring(rawRotateY, springConfig);
  const translateX = useSpring(rawTranslateX, springConfig);
  const cardScale = useSpring(rawScale, springConfig);
  const rotateZ = useSpring(rawRotateZ, springConfig);

  const badgeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [showWave, setShowWave] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setShowWave((v) => !v), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[300vh]">
      {/* Sticky layer — card stays pinned at center */}
      <div className="relative z-[2] h-[300vh] pointer-events-none">
        <div className="sticky top-0 hidden h-screen items-center justify-center overflow-hidden lg:flex">
          {/* Card flip container — smaller on mobile */}
          <motion.div
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
                  backfaceVisibility: "visible",
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

              {/* Hi badge — carousel with "Hi" text and wave icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.8,
                }}
                className="absolute -bottom-4 -left-4 z-10 h-[80px] w-[80px] overflow-hidden rounded-full bg-[#d0ff71] lg:-bottom-6 lg:-left-6 lg:h-[120px] lg:w-[120px]"
                style={{ backfaceVisibility: "visible", z: 30, opacity: badgeOpacity }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: showWave ? "-50%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex h-[80px] w-[80px] items-center justify-center lg:h-[120px] lg:w-[120px]">
                    <span className="text-[26px] font-semibold text-[#303030] lg:text-[40px]">
                      Hi
                    </span>
                  </div>
                  <div className="flex h-[80px] w-[80px] items-center justify-center lg:h-[120px] lg:w-[120px]">
                    <WaveHandIcon className="h-[40px] w-[40px] text-black lg:h-[60px] lg:w-[60px]" />
                  </div>
                </motion.div>
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

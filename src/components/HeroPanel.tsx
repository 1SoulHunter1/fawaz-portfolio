"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { WaveHandIcon } from "@/components/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function HeroPanel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 md:px-10 lg:flex-row lg:items-center lg:justify-center lg:gap-[370px]">
        {/* Left column */}
        <div className="flex flex-col justify-center lg:w-[415px]">
          <div className="relative">
            <div className="absolute bottom-full mb-1 overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="font-heading text-[20px] font-normal leading-[26px] text-white uppercase lg:text-[32px] lg:leading-[41.6px]"
              >
                Duncan Robert
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 0.8, ease, delay: 0.25 }}
                className="font-heading text-[60px] font-bold leading-[1.1] tracking-[-2px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]"
              >
                DIGITAL
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Mobile-only static card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="relative lg:hidden"
        >
          <Image
            src="/images/portrait-front.jpg"
            alt="Portrait"
            width={240}
            height={340}
            className="rounded-[16px] object-cover"
            priority
          />
          <div className="absolute -bottom-4 -left-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#d0ff71]">
            <WaveHandIcon className="h-[40px] w-[40px] text-black" />
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col justify-center lg:w-[415px]">
          <div className="relative">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 0.8, ease, delay: 0.35 }}
                className="font-heading text-[60px] font-bold leading-[1.1] tracking-[-2px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]"
              >
                DESIGNER
              </motion.h1>
            </div>
            <div className="absolute top-full mt-2 overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 0.8, ease, delay: 0.45 }}
                className="max-w-[348px] text-base font-light leading-[24px] text-white lg:text-right lg:text-lg lg:leading-[27px]"
              >
                I&apos;m a US-based digital designer and Framer developer
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

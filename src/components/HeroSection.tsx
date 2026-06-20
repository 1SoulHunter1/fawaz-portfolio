"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#1a1a1b] pt-24 pb-12">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(/images/hero-pattern.gif)",
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-6 md:px-10">
        {/* Top area: DUNCAN ROBERT + centered photo */}
        <div className="relative mt-8 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="absolute left-0 top-0 text-lg font-light tracking-[2px] text-white uppercase"
          >
            DUNCAN ROBERT
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative mx-auto h-[476px] w-[340px]"
          >
            <Image
              src="/images/portrait-front.jpg"
              alt="Portrait of portfolio creator – front view"
              width={340}
              height={476}
              className="rounded-[20px] object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* DIGITAL ... DESIGNER heading row — overlaps photo significantly */}
        <div className="relative -mt-[304px] flex w-full items-center justify-between overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="font-heading text-[60px] font-bold leading-[1.1] tracking-[-3.6px] text-white uppercase lg:text-[120px] lg:leading-[132px]"
          >
            DIGITAL
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="font-heading text-[60px] font-bold leading-[1.1] tracking-[-3.6px] uppercase lg:text-[120px] lg:leading-[132px]"
            style={{ WebkitTextStroke: "1.5px white", color: "transparent" }}
          >
            DESIGNER
          </motion.h1>
        </div>

        {/* Subtitle — right-aligned, overlapping lower photo area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
          className="mt-4 flex w-full justify-end"
        >
          <p className="max-w-[348px] text-right text-lg font-light leading-[27px] text-white">
            I&apos;m a US-based digital designer and Framer developer
          </p>
        </motion.div>

        {/* Hi circle — lime green circle with wave icon, matching original */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-16 flex w-full"
        >
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#d0ff71]">
            <span className="text-4xl">👋</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

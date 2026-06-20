"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { CountUp } from "@/components/animations/CountUp";
import {
  XIcon,
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
  ArrowRightIcon,
} from "@/components/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stats = [
  { value: 12, suffix: "", label: "Years of Experience" },
  { value: 270, suffix: "", label: "Completed Projects" },
  { value: 50, suffix: "+", label: "Clients on Worldwide" },
];

const socials = [
  { icon: XIcon, href: "https://x.com/home", label: "X" },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  { icon: BehanceIcon, href: "https://www.behance.net/", label: "Behance" },
  { icon: DribbbleIcon, href: "https://dribbble.com/", label: "Dribbble" },
];

export function AboutPanel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="flex h-screen w-full items-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="flex max-w-[600px] flex-col gap-10">
          {/* Heading + body */}
          <div className="flex flex-col gap-[10px]">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease }}
              className="font-heading text-[36px] font-bold leading-tight text-white uppercase lg:text-[60px] lg:leading-[78px]"
            >
              ABOUT ME
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="max-w-[500px] text-lg font-light leading-[27px] text-white"
            >
              Hi, I&apos;m Duncan — a digital designer and Framer developer
              passionate about crafting meaningful and impactful digital
              experiences.
            </motion.p>
          </div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="grid grid-cols-2 gap-5 lg:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-[20px] bg-[#d0ff71] p-8"
              >
                <span className="font-heading text-[60px] font-bold leading-[60px] text-black">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-black">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-white">
                Call Today :
              </span>
              <a
                href="tel:+1 (555) 123-4567"
                className="text-lg font-light text-white transition-colors hover:text-[#d0ff71]"
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-white">
                Email :
              </span>
              <a
                href="mailto:designer@example.com"
                className="text-lg font-light text-white transition-colors hover:text-[#d0ff71]"
              >
                designer@example.com
              </a>
            </div>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="flex items-center gap-5"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[30px] w-[30px] items-center justify-center text-white transition-opacity hover:opacity-70"
                aria-label={social.label}
              >
                <social.icon className="h-[30px] w-[30px]" />
              </a>
            ))}
          </motion.div>

          {/* My Story CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-heading text-[26px] font-normal text-[#d0ff71] uppercase transition-opacity hover:opacity-80"
            >
              MY STORY
              <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

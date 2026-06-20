"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { CountUp } from "@/components/animations/CountUp";
import {
  XIcon,
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
  ArrowRightIcon,
} from "@/components/icons";

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

export function AboutSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            ABOUT ME
          </h2>
          <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
            Hi, I&apos;m Duncan — a digital designer and Framer developer
            passionate about crafting meaningful and impactful digital experiences.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-5 sm:grid-cols-3" staggerDelay={0.1}>
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
        </StaggerReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#b5b5b5]">Call Today :</span>
              <a
                href="tel:+1 (555) 123-4567"
                className="text-sm text-white transition-colors hover:text-[#d0ff71]"
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#b5b5b5]">Email :</span>
              <a
                href="mailto:designer@example.com"
                className="text-sm text-white transition-colors hover:text-[#d0ff71]"
              >
                designer@example.com
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-8 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#303030] text-[#b5b5b5] transition-colors hover:bg-[#d0ff71] hover:text-black"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-3 font-heading text-[26px] font-normal text-[#d0ff71] uppercase transition-opacity hover:opacity-80"
          >
            MY STORY
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

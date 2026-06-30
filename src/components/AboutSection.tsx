"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { CountUp } from "@/components/animations/CountUp";
import {
  GithubIcon,
  LinkedinIcon,
  ArrowRightIcon,
} from "@/components/icons";

const stats = [
  { value: 6, suffix: "", label: "Hackathons Competed" },
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "+", label: "Years Building AI Systems" },
];

const socials = [
  { icon: GithubIcon, href: "https://github.com/1SoulHunter1", label: "GitHub" },
  {
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/sheik-mohammad-fawaz-83605a291",
    label: "LinkedIn",
  },
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
            Hi, I&apos;m Fawaz &mdash; a final-year AI &amp; ML engineer passionate
            about building multimodal AI systems, intelligent automation, and full-stack
            applications that solve real problems.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-5 sm:grid-cols-3" staggerDelay={0.1}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-[20px] bg-[#d0ff71] p-8"
            >
              <span className="font-heading text-[60px] font-bold leading-[60px] text-[#303030]">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-[#303030]">{stat.label}</span>
            </div>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#b5b5b5]">Call Today :</span>
              <a
                href="tel:+917019644596"
                className="text-sm text-white transition-colors hover:text-[#d0ff71]"
              >
                +91 7019644596
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#b5b5b5]">Email :</span>
              <a
                href="mailto:sheikfawaz32@gmail.com"
                className="text-sm text-white transition-colors hover:text-[#d0ff71]"
              >
                sheikfawaz32@gmail.com
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#303030] text-[#b5b5b5] transition-colors hover:bg-[#d0ff71] hover:text-[#303030]"
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
            className="group/cta relative mt-10 inline-flex h-[48px] items-center gap-3 overflow-hidden rounded-full border border-accent px-8 font-heading text-[26px] font-normal text-[#d0ff71] uppercase"
            data-cursor="arrow"
          >
            <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover/cta:text-[#303030]">
              MY STORY
              <ArrowRightIcon className="h-6 w-6" />
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

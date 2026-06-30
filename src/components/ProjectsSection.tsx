"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ArrowRightIcon } from "@/components/icons";

const projects = [
  {
    slug: "veritas-neural",
    image: "/images/project-summer-vibes.jpeg",
    category: "AI / Deep Learning",
    title: "VERITAS NEURAL",
    description:
      "A 4-modality deepfake detection engine using a 3-model ensemble achieving sub-1.5s inference latency on CPU-only hardware, with a Dockerized FastAPI backend and React frontend for fully local, privacy-preserving inference.",
  },
  {
    slug: "linkedin-resume-ats-pipeline",
    image: "/images/project-coral-spiral.jpg",
    category: "AI Automation",
    title: "LINKEDIN RESUME ATS PIPELINE",
    description:
      "An autonomous n8n workflow that scrapes LinkedIn internships via Apify, tailors ATS-optimized resumes with Google Gemini, compiles them to PDF, and delivers a daily email digest.",
  },
  {
    slug: "agentflow",
    image: "/images/project-shopease.jpeg",
    category: "AI / Productivity",
    title: "AGENTFLOW",
    description:
      "An AI-powered automation workspace with streaming chat, multi-agent research, Notion integration, and file processing — built with Next.js 15, Groq AI, Prisma, and PostgreSQL.",
  },
  {
    slug: "fittrack-fitness-tracker",
    image: "/images/project-black-prisms.jpeg",
    category: "Mobile App",
    title: "FITTRACK — FITNESS TRACKER",
    description:
      "A Flutter fitness app with Material 3 UI, animated charts, dual database support (SQLite + Firebase), and Provider state management — built during a CodeAlpha internship.",
  },
];

const CARD_TOP = 80;
const CARD_OFFSET = 32;

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 80px", "end start"],
  });

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isLast = index === total - 1;
  const stickyTop = CARD_TOP + index * CARD_OFFSET;

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0, 0, isLast ? 0 : isMobile ? -20 : -45],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0, 0, isLast ? 0 : isMobile ? -15 : -30],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [1, 1, isLast ? 1 : isMobile ? 0.96 : 0.95],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [1, 1, isLast ? 1 : 0],
  );

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{
        top: stickyTop,
        zIndex: index + 1,
        paddingBottom: isLast ? 0 : 80,
        perspective: 1200,
      }}
    >
      <motion.div
        style={{ rotateX, y, scale, opacity, backfaceVisibility: "hidden" }}
        className="will-change-transform origin-top"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group relative block aspect-[3/2] w-full overflow-hidden rounded-[20px]"
          data-cursor="arrow"
        >
          <Image
            src={project.image}
            alt="Featured Project Cover Image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-sm font-light text-[#b5b5b5]">
              {project.category}
            </span>
            <h2 className="font-heading max-w-[756px] text-[32px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
              {project.title}
            </h2>
            <p className="max-w-[600px] text-sm font-light leading-[21px] text-white/80">
              {project.description}
            </p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            FEATURED PROJECTS
          </h2>
          <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
            These selected projects reflect my passion for solving real
            problems — from deepfake detection and intelligent automation to
            multi-agent AI systems and mobile app development.
          </p>
        </ScrollReveal>

        <div className="mt-12">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group/cta font-heading relative inline-flex h-[48px] items-center gap-3 overflow-hidden rounded-full border border-accent px-8 text-[22px] font-normal text-[#d0ff71] uppercase md:text-[26px]"
            data-cursor="arrow"
          >
            <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover/cta:text-[#303030]">
              BROWSE ALL PROJECTS
              <ArrowRightIcon className="h-6 w-6" />
            </span>
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

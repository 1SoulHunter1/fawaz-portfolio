"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "1",
    title: "AI & MACHINE LEARNING",
    items: [
      "Deep learning model development with PyTorch",
      "Multimodal AI systems (vision, audio, text)",
      "Model evaluation, cross-validation, and benchmarking",
      "Deployment of ML pipelines with Docker + FastAPI",
    ],
  },
  {
    number: "2",
    title: "GENERATIVE AI & AUTOMATION",
    items: [
      "Multi-agent automation systems",
      "Prompt engineering for LLMs",
      "Workflow automation with n8n",
      "LLM integration (Groq API, HuggingFace Transformers)",
    ],
  },
  {
    number: "3",
    title: "FULL-STACK DEVELOPMENT",
    items: [
      "REST API development (FastAPI, Node.js)",
      "Frontend development with React and Next.js",
      "Database design (PostgreSQL, Prisma ORM)",
      "Cross-platform apps with Flutter",
    ],
  },
  {
    number: "4",
    title: "SOFTWARE ENGINEERING",
    items: [
      "Docker containerization",
      "Git/GitHub version control workflows",
      "Cloud deployment on Google Cloud",
      "Technical documentation with LaTeX/Overleaf",
    ],
  },
];

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            WHAT I CAN DO FOR YOU
          </h2>
          <p className="mt-4 max-w-[600px] text-base font-light leading-6 text-white">
            As an AI/ML engineer, I build systems that learn, automate, and scale &mdash;
            turning research into working products.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 flex flex-col" staggerDelay={0.1}>
          {services.map((service, i) => {
            const open = openIndex === i;
            return (
              <div key={service.number} className="border-t border-[#333]">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="group flex w-full items-center justify-between py-5 text-left"
                >
                  <h3
                    className={cn(
                      "font-heading text-[24px] font-normal uppercase leading-[1.3] transition-colors duration-300 md:text-[32px] md:leading-[41.6px]",
                      open
                        ? "text-[#d0ff71]"
                        : "text-white group-hover:text-[#d0ff71]",
                    )}
                  >
                    {service.number}. {service.title}
                  </h3>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 text-white transition-transform duration-300",
                      open ? "rotate-0" : "rotate-180",
                    )}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-3">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base font-light text-[#b5b5b5]"
                        >
                          <span className="mt-0.5 w-5 shrink-0 text-[#d0ff71]">
                            <CheckCircleIcon />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}

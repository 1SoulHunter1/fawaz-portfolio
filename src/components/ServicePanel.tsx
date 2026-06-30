"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ServicesAccordion,
  type ServiceItem,
} from "@/components/ServicesAccordion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const services: ServiceItem[] = [
  {
    number: "1",
    title: "AI & MACHINE LEARNING",
    image: "/images/cms/fw9i7cnyP36KPrIT0FHN2bcu0xU.jpeg",
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
    image: "/images/cms/VjFhPmRUqOEECNBJzS5qTNQ2M.jpeg",
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
    image: "/images/cms/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg",
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
    image: "/images/cms/1wFj19qQG6zNr7gj3iTlH0Gdlu8.jpeg",
    items: [
      "Docker containerization",
      "Git/GitHub version control workflows",
      "Cloud deployment on Google Cloud",
      "Technical documentation with LaTeX/Overleaf",
    ],
  },
];

export function ServicePanel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="flex h-screen w-full items-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="flex max-w-[600px] flex-col gap-10">
          <div className="flex flex-col gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease }}
              className="font-heading text-[36px] font-bold leading-tight text-white uppercase lg:text-[60px] lg:leading-[78px]"
            >
              AREAS OF EXPERTISE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="max-w-[500px] text-lg font-light leading-[27px] text-white"
            >
              I design and build AI &mdash; powered applications, intelligent automation systems, 
              and scalable software from concept to deployment.
            </motion.p>
          </div>

          <ServicesAccordion services={services} />
        </div>
      </div>
    </section>
  );
}

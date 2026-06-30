"use client";

import { ServicesAccordion, type ServiceItem } from "@/components/ServicesAccordion";

// Photos shown by the cursor-following MouseFollower ("image" variant) when an
// item is hovered. Captured 1:1 from portavia.framer.website/about — each
// "Service Hover Image - N" maps to accordion item N.
const services: ServiceItem[] = [
  {
    number: "1",
    title: "AI & MACHINE LEARNING",
    image: "/images/cms/wOCTh6BhMTLrGPZ7C8doO3XdY.jpeg",
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
    image: "/images/cms/RPxWdsXRtMBhMcTCb414zGg2QY.jpeg",
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
    image: "/images/cms/Ov53jG8lAoAFuct0Li7vWgmOqQ.jpeg",
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
    image: "/images/cms/9HduiIXX5eSq1WREpvO4qCnKM.jpeg",
    items: [
      "Docker containerization",
      "Git/GitHub version control workflows",
      "Cloud deployment on Google Cloud",
      "Technical documentation with LaTeX/Overleaf",
    ],
  },
];

export function AboutServicesAccordion() {
  return <ServicesAccordion services={services} className="mt-10" />;
}

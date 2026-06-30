import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { AboutStickyScroll } from "@/components/AboutStickyScroll";
import { AboutServicesAccordion } from "@/components/AboutServicesAccordion";
import { cn } from "@/lib/utils";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About — Portavia",
  description:
    "Sheik Mohammad Fawaz — an India-based AI/ML engineer and full-stack developer building intelligent systems that solve real-world problems.",
};

const socials = [
  { icon: GithubIcon, href: "https://github.com/1SoulHunter1", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/sheik-mohammad-fawaz-83605a291", label: "LinkedIn" },
];

const timeline = [
  { role: "Campus Ambassador", company: "Syntro Tech", years: "Jun 2026 – Present" },
  { role: "App Development Intern", company: "CodeAlpha", years: "Sep 2025 – Oct 2025" },
  { role: "B.E in AI/ML", company: "P.A. College of Engineering", years: "2023 – Present" },
];

const certifications = [
  {
    title: "Signal Processing with AI using Python",
    issuer: "IEEE Signal Processing Society (P.A.C.E.)",
    date: "Oct 2025",
  },
  {
    title: "Google Cloud Gen AI Academy 2.0",
    issuer: "Google Cloud",
    date: "2025",
  },
];

const techStack = [
  {
    name: "Python",
    logo: "/images/cms/Nf63tXddU52SRtJJgRHqk7zzD2g.png",
    description:
      "My primary language for AI/ML development, data pipelines, and backend logic.",
  },
  {
    name: "PyTorch",
    logo: "/images/cms/RaZetiUCiiVee9pYfau5kIm0k.jpg",
    description:
      "Deep learning framework for building and training neural networks — used in Veritas Neural and KesarAI.",
  },
  {
    name: "HuggingFace Transformers",
    logo: "/images/cms/KhZnIlAtOozB2Axd5yg9ALd7A.jpg",
    description:
      "Pre-trained models and pipelines for NLP, text classification, and LLM integration.",
  },
  {
    name: "React / Next.js",
    logo: "/images/cms/FigaBMy3WrTNL79MFKifsXxXE.jpg",
    description:
      "Full-stack web framework for building interactive UIs and server-rendered applications.",
  },
  {
    name: "FastAPI",
    logo: "/images/cms/1jsryiRhbB5SoLHzyceqqF9tpo.jpg",
    description:
      "High-performance Python backend framework for ML-powered REST APIs.",
  },
  {
    name: "Docker",
    logo: "/images/cms/Nf63tXddU52SRtJJgRHqk7zzD2g.png",
    description:
      "Containerization for consistent deployments across dev, staging, and production.",
  },
  {
    name: "PostgreSQL / Prisma",
    logo: "/images/cms/RaZetiUCiiVee9pYfau5kIm0k.jpg",
    description:
      "Relational database with type-safe ORM for persistent state in the ATS Pipeline and automation projects.",
  },
  {
    name: "n8n / Groq API",
    logo: "/images/cms/KhZnIlAtOozB2Axd5yg9ALd7A.jpg",
    description:
      "Workflow automation engine paired with ultra-fast LLM inference for multi-agent pipelines.",
  },
];

interface ProcessGridItem {
  type: "card" | "image";
  number?: string;
  title?: string;
  description?: string;
  tone?: "white" | "lime" | "dark";
  image?: string;
  colSpan?: number;
}

const processGrid: ProcessGridItem[] = [
  {
    type: "card",
    number: "01.",
    title: "Problem Definition & Research",
    description:
      "Every project starts with deeply understanding the problem. I research existing solutions, define success metrics, and identify the right approach — whether that's deep learning, classical ML, or rule-based automation.",
    tone: "white",
  },
  {
    type: "image",
    image: "/images/cms/fw9i7cnyP36KPrIT0FHN2bcu0xU.jpeg",
  },
  {
    type: "card",
    number: "02.",
    title: "Data Collection & Preprocessing",
    description:
      "Good models start with good data. I build ingestion pipelines, clean and augment datasets, engineer features, and validate data quality before any model training begins.",
    tone: "lime",
  },
  {
    type: "card",
    number: "03.",
    title: "Model Architecture & Training",
    description:
      "I design and train models using PyTorch, scikit-learn, or HuggingFace Transformers — selecting architectures that balance accuracy, inference speed, and deployment constraints.",
    tone: "dark",
    colSpan: 2,
  },
  {
    type: "image",
    image: "/images/cms/VjFhPmRUqOEECNBJzS5qTNQ2M.jpeg",
  },
  {
    type: "card",
    number: "04.",
    title: "API / Backend Integration",
    description:
      "Models become useful when they're accessible. I build FastAPI backends, connect to databases with Prisma/PostgreSQL, and create React frontends that make AI capabilities easy to use.",
    tone: "lime",
  },
  {
    type: "card",
    number: "05.",
    title: "Deployment & Continuous Testing",
    description:
      "I containerize with Docker, deploy to cloud or edge hardware, and set up monitoring to catch model drift and performance degradation in production.",
    tone: "white",
  },
  {
    type: "image",
    image: "/images/cms/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg",
  },
];

const toneStyles: Record<NonNullable<ProcessGridItem["tone"]>, string> = {
  white: "bg-white text-[#303030]",
  lime: "bg-[#d0ff71] text-[#303030]",
  dark: "bg-[#333] text-white",
};

function ProcessGridCell({ item }: { item: ProcessGridItem }) {
  if (item.type === "image") {
    return (
      <div className="relative h-[380px] overflow-hidden rounded-[20px]">
        <Image
          src={item.image!}
          alt=""
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-[380px] flex-col justify-center gap-2 rounded-[20px] p-10",
        toneStyles[item.tone!],
        item.colSpan === 2 && "md:col-span-2",
      )}
    >
      <span className="font-heading text-[48px] font-bold leading-none md:text-[60px]">
        {item.number}
      </span>
      <h3 className="font-heading text-[26px] font-normal leading-tight md:text-[32px]">
        {item.title}
      </h3>
      <p className="text-sm font-light leading-[21px]">
        {item.description}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutStickyScroll>
          {/* Hero — original has Container with px-40, no top/bottom padding on container */}
          <section className="w-full min-h-screen px-6 pt-36 pb-16 md:px-10 lg:pt-[133px]">
            <div className="flex max-w-[480px] flex-col">
              <h1 className="font-heading text-[56px] font-bold leading-[1.05] tracking-[-2px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]">
                About me
              </h1>
              <h3 className="font-heading mt-6 text-[26px] font-normal leading-[41.6px] text-white uppercase md:text-[32px]">
                Sheik Mohammad Fawaz
              </h3>
              <p className="mt-6 text-lg font-light leading-[27px] text-white">
                I&apos;m a final-year B.E. student in Artificial Intelligence and
                Machine Learning, passionate about building intelligent systems
                that solve real-world problems.
              </p>
              <p className="mt-4 text-lg font-light leading-[27px] text-white">
                My work spans deep learning, multi-agent automation, and 
                full-stack development — turning ideas into working systems, from 
                deepfake detection engines to automation platforms, using 
                Python, PyTorch, React, and Next.js.
              </p>


              <div className="mt-8 flex items-center gap-5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[30px] w-[30px] items-center justify-center text-white transition-colors hover:text-[#d0ff71]"
                    aria-label={social.label}
                  >
                    <social.icon className="h-[30px] w-[30px]" />
                  </a>
                ))}
              </div>

              {/* Mobile only: static image */}
              <div className="relative mx-auto mt-10 h-[476px] w-full max-w-[340px] overflow-hidden rounded-[20px] lg:hidden">
                <Image
                  src="/images/cms/qrxY8NagVO40NBrdhFEGgFR3PYY.png"
                  alt="Portrait"
                  fill
                  sizes="340px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Services — collapsed accordion (number + title only) */}
          <section className="w-full px-6 py-[120px] md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                AREAS OF EXPERTISE
              </h2>
              <p className="mt-5 max-w-[500px] text-lg font-light leading-[27px] text-white">
                I design and build AI &mdash; powered applications, intelligent automation systems, 
                and scalable software from concept to deployment.
                
              </p>
            </ScrollReveal>

            <AboutServicesAccordion />
          </section>

          {/* Journey timeline */}
          <section className="w-full px-6 py-[120px] md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                Discover My Journey in Tech
              </h2>
              <p className="mt-2.5 max-w-[700px] text-lg font-light leading-[27px] text-white">
                From curious builder to AI/ML engineer, my path has been shaped
                by a passion for creating intelligent systems and solving real-world
                problems &mdash; blending research, engineering, and creativity into
                every project.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10" staggerDelay={0.1}>
              {timeline.map((item) => (
                <div
                  key={item.role}
                  className="flex items-center justify-between border-t border-[#333] py-5"
                >
                  <h3 className="font-heading text-[26px] font-normal leading-[1.3] text-white uppercase md:text-[32px] md:leading-[41.6px]">
                    {item.role}
                  </h3>
                  <div className="flex shrink-0 flex-col items-end">
                    <span className="text-lg font-semibold leading-[23.4px] text-[#d0ff71]">
                      {item.company}
                    </span>
                    <span className="text-sm font-light leading-[21px] text-white">
                      {item.years}
                    </span>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </section>

          {/* Certifications — compact badges */}
          <section className="w-full px-6 py-[120px] md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                Certifications
              </h2>
            </ScrollReveal>

            <StaggerReveal className="mt-10 grid gap-5 md:grid-cols-2" staggerDelay={0.1}>
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex flex-col gap-2 rounded-[20px] border border-[#333] p-6"
                >
                  <h3 className="font-heading text-lg font-semibold leading-tight text-white">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-light text-[#d0ff71]">
                      {cert.issuer}
                    </span>
                    <span className="text-sm font-light text-[#b5b5b5]">
                      · {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </section>

          {/* Tech stack — vertical list of cards */}
          <section className="w-full px-6 py-[120px] md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                My Tech Stack
              </h2>
              <p className="mt-2.5 max-w-[700px] text-lg font-light leading-[27px] text-white">
                I build with intention. Python and PyTorch for AI/ML. React and
                Next.js for modern frontends. FastAPI and Docker for production
                deployments. Each tool supports how I think, build, and ship.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10 flex flex-col" staggerDelay={0.08}>
              {techStack.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-start gap-5 border-b-[0.8px] border-[#333] py-5"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold leading-[23.4px] text-white">
                      {tool.name}
                    </span>
                    <p className="text-sm font-light leading-[21px] text-white">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </section>
        </AboutStickyScroll>

        {/* Process — full width, outside sticky scroll */}
        <section className="w-full py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                How I Build AI Systems
              </h2>
              <p className="mt-5 max-w-[700px] text-lg font-light leading-[27px] text-white">
                From problem definition to production deployment, my process
                combines rigorous engineering with practical iteration to build
                AI systems that actually work.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10 grid gap-5 md:grid-cols-3" staggerDelay={0.1}>
              {processGrid.map((item, i) => (
                <ProcessGridCell key={i} item={item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Contact (shared) */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

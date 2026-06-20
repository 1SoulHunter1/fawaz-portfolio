import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { AboutStickyScroll } from "@/components/AboutStickyScroll";
import { cn } from "@/lib/utils";
import {
  XIcon,
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
  CheckCircleIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About — Portavia",
  description:
    "Duncan Robert — a US-based digital designer and Framer developer crafting meaningful, user-centered experiences.",
};

const socials = [
  { icon: XIcon, href: "https://x.com/", label: "X" },
  { icon: InstagramIcon, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: BehanceIcon, href: "https://www.behance.net/", label: "Behance" },
  { icon: DribbbleIcon, href: "https://dribbble.com/", label: "Dribbble" },
];

const services = [
  {
    number: "1",
    title: "UI/UX DESIGN",
    items: [
      "Wireframing and prototyping",
      "User Interface design for web and mobile apps",
      "Usability testing and user feedback analysis",
      "Interaction design and micro-animations",
    ],
  },
  {
    number: "2",
    title: "GRAPHIC DESIGN",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
  },
  {
    number: "3",
    title: "WEB DESIGN",
    items: [
      "Responsive website design",
      "Landing page design and optimization",
      "Webflow development and customization",
      "Website maintenance and updates",
    ],
  },
  {
    number: "4",
    title: "BRANDING",
    items: [
      "Brand strategy and identity development",
      "Visual style guide creation",
      "Typography and color scheme selection",
      "Brand storytelling and messaging",
    ],
  },
];

const timeline = [
  { role: "Creative Art Director", company: "NovaWorks Agency", years: "2023 - Present" },
  { role: "Senior UI/UX Designer", company: "BrightLabs Digital", years: "2020 - 2023" },
  { role: "UI Designer", company: "PixelForge Interactive", years: "2018 - 2020" },
  { role: "Graphic Designer", company: "Creative Studio 101", years: "2016 - 2018" },
];

const techStack = [
  {
    name: "Framer",
    logo: "/images/cms/Nf63tXddU52SRtJJgRHqk7zzD2g.png",
    description:
      "My creative playground for building interactive and responsive websites—fast, flexible, and no code.",
  },
  {
    name: "Figma",
    logo: "/images/cms/RaZetiUCiiVee9pYfau5kIm0k.jpg",
    description:
      "Where I connect, share insights, and grow within the design and Framer community.",
  },
  {
    name: "X",
    logo: "/images/cms/KhZnIlAtOozB2Axd5yg9ALd7A.jpg",
    description:
      "My go-to for UI/UX design—perfect for wireframing, prototyping, and collaborating in real time.",
  },
  {
    name: "Spline",
    logo: "/images/cms/FigaBMy3WrTNL79MFKifsXxXE.jpg",
    description:
      "My tool for bringing 3D visuals into the web—perfect for adding playful, interactive depth to projects.",
  },
  {
    name: "Lemon Squeezy",
    logo: "/images/cms/1jsryiRhbB5SoLHzyceqqF9tpo.jpg",
    description:
      "My trusted solution for managing payments and licensing digital products effortlessly.",
  },
];

interface ProcessCard {
  number: string;
  title: string;
  description: string;
  tone: "white" | "lime" | "dark";
  image?: string;
  wide?: boolean;
}

const process: ProcessCard[] = [
  {
    number: "01.",
    title: "Research & Strategy",
    description:
      "In this phase, I dive deep into understanding your business, target audience, and project goals. Through research and strategic planning, I create a clear roadmap to guide the entire design process.",
    tone: "white",
    image: "/images/cms/fw9i7cnyP36KPrIT0FHN2bcu0xU.jpeg",
  },
  {
    number: "02.",
    title: "Concept & Ideation",
    description:
      "Here, I brainstorm and develop creative concepts that align with your vision. Initial sketches and ideas are refined into tangible wireframes, setting the direction for design and functionality.",
    tone: "lime",
  },
  {
    number: "03.",
    title: "Feedback & Refinement",
    description:
      "Collaboration is key. I review the design with you, gather feedback, and refine the work to align with your expectations and goals. This ensures the design reflects your vision.",
    tone: "dark",
    image: "/images/cms/VjFhPmRUqOEECNBJzS5qTNQ2M.jpeg",
    wide: true,
  },
  {
    number: "04.",
    title: "Testing & Optimization",
    description:
      "I conduct thorough testing to identify and resolve any performance or usability issues. This phase ensures the design works seamlessly across devices and meets user experience standards.",
    tone: "lime",
    image: "/images/cms/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg",
  },
  {
    number: "05.",
    title: "Launch & Delivery",
    description:
      "Once everything is finalized, the project is launched and delivered to you. I also provide guidance or support for ongoing maintenance to ensure long-term success.",
    tone: "white",
  },
];

const toneStyles: Record<ProcessCard["tone"], string> = {
  white: "bg-white text-[#303030]",
  lime: "bg-[#d0ff71] text-black",
  dark: "bg-[#303030] text-white",
};

function ProcessCardItem({ card }: { card: ProcessCard }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-[20px] p-8 md:p-10",
        toneStyles[card.tone],
        card.wide && "md:col-span-2",
        card.wide && card.image && "md:flex-row md:items-center md:gap-8"
      )}
    >
      <div className="flex flex-col gap-3 md:flex-1">
        <span className="font-heading text-[48px] font-bold leading-none md:text-[60px]">
          {card.number}
        </span>
        <h3 className="font-heading text-[26px] font-normal leading-tight md:text-[32px]">
          {card.title}
        </h3>
        <p className="text-base font-light leading-[27px] md:text-lg">
          {card.description}
        </p>
      </div>
      {card.image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-[20px]",
            card.wide ? "aspect-[36/38] w-full md:w-[360px] md:shrink-0" : "mt-auto aspect-[36/38] w-full max-w-[360px]"
          )}
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutStickyScroll>
          {/* Hero */}
          <section className="w-full bg-[#1a1a1b] pt-36 pb-16 md:pt-44">
            <div className="flex flex-col">
              <h1 className="font-heading text-[56px] font-bold leading-[1.05] tracking-[-2px] text-white uppercase lg:text-[120px] lg:leading-[120px] lg:tracking-[-3.6px]">
                About me
              </h1>
              <h3 className="font-heading mt-6 text-[26px] font-normal text-white uppercase md:text-[32px]">
                Duncan Robert
              </h3>
              <p className="mt-6 max-w-[520px] text-lg font-light leading-[27px] text-white">
                I&apos;m a digital designer and Framer developer passionate about
                crafting meaningful, user-centered experiences.
              </p>
              <p className="mt-4 max-w-[520px] text-lg font-light leading-[27px] text-[#b5b5b5]">
                With a strong foundation in visual design and a deep understanding
                of interactive systems, I bring ideas to life through thoughtful
                design, smooth animations, and responsive layouts.
              </p>
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

              {/* Mobile only: static image */}
              <div className="relative mx-auto mt-10 h-[476px] w-full max-w-[340px] overflow-hidden rounded-[20px] lg:hidden">
                <Image
                  src="/images/cms/qrxY8NagVO40NBrdhFEGgFR3PYY.jpg"
                  alt="Portrait"
                  fill
                  sizes="340px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="w-full bg-[#1a1a1b] py-20">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                WHAT I CAN DO FOR YOU
              </h2>
              <p className="mt-4 max-w-[500px] text-lg font-light leading-[27px] text-white">
                As a digital designer, I am a visual storyteller, crafting
                experiences that connect deeply and spark creativity.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10" staggerDelay={0.1}>
              {services.map((service) => (
                <div key={service.number} className="border-t border-[#333] py-5">
                  <h3 className="font-heading text-[24px] font-normal leading-[1.3] text-white uppercase lg:text-[32px] lg:leading-[41.6px]">
                    {service.number}. {service.title}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-lg font-light text-white"
                      >
                        <span className="mt-0.5 w-5 shrink-0 text-white">
                          <CheckCircleIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </StaggerReveal>
          </section>

          {/* Journey timeline */}
          <section className="w-full bg-[#1a1a1b] py-20">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                Discover My Journey in Design
              </h2>
              <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
                From curious creator to full-time designer, my path has been shaped
                by a passion for crafting purposeful, user-centered digital
                experiences—blending storytelling, structure, and design into every
                project.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-12" staggerDelay={0.1}>
              {timeline.map((item) => (
                <div
                  key={item.role}
                  className="flex flex-col gap-2 border-t border-[#333] py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-[26px] font-normal text-white uppercase md:text-[32px]">
                      {item.role}
                    </h3>
                    <span className="text-lg font-semibold text-[#d0ff71]">
                      {item.company}
                    </span>
                  </div>
                  <span className="text-lg font-light text-[#b5b5b5]">
                    {item.years}
                  </span>
                </div>
              ))}
            </StaggerReveal>
          </section>

          {/* Tech stack */}
          <section className="w-full bg-[#1a1a1b] py-20">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                My Tech Stack
              </h2>
              <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
                I build with intention. Framer for fast, interactive web design.
                Figma for clean interfaces. Notion and X for content. Each tool
                supports how I think, design.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" staggerDelay={0.08}>
              {techStack.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col gap-4 rounded-[20px] border border-[#333] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-heading text-[24px] font-normal text-white">
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-sm font-light leading-[21px] text-[#b5b5b5]">
                    {tool.description}
                  </p>
                </div>
              ))}
            </StaggerReveal>
          </section>
        </AboutStickyScroll>

        {/* Process */}
        <section className="w-full bg-[#1a1a1b] py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                Design with Strategy and Creativity
              </h2>
              <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
                My process blends strategy and creativity to address challenges,
                craft solutions, and deliver designs that effectively communicate
                your message.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-12 grid gap-5 md:grid-cols-2" staggerDelay={0.1}>
              {process.map((card) => (
                <ProcessCardItem key={card.number} card={card} />
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

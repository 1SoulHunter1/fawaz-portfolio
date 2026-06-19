"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

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

function ServiceAccordionItem({
  service,
}: {
  service: (typeof services)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#333]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5"
      >
        <h3 className="font-heading text-[24px] font-normal leading-[1.3] text-white uppercase md:text-[32px] md:leading-[41.6px]">
          {service.number}. {service.title}
        </h3>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={cn(
            "shrink-0 text-white transition-transform duration-300",
            open && "rotate-180"
          )}
        >
          <path
            d="M5 12.5L10 7.5L15 12.5"
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
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base font-light text-[#b5b5b5]"
              >
                <span className="mt-0.5 w-5 shrink-0 text-[rgb(106,113,223)]">
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
}

export function ServicesSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            WHAT I CAN DO FOR YOU
          </h2>
          <p className="mt-4 max-w-[600px] text-base font-light leading-6 text-white">
            As a digital designer, I am a visual storyteller, crafting experiences
            that connect deeply and spark creativity.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 flex flex-col" staggerDelay={0.1}>
          {services.map((service) => (
            <ServiceAccordionItem key={service.number} service={service} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const services = [
  {
    number: "1",
    title: "UI/UX DESIGN",
    image: "/images/cms/fw9i7cnyP36KPrIT0FHN2bcu0xU.jpeg",
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
    image: "/images/cms/VjFhPmRUqOEECNBJzS5qTNQ2M.jpeg",
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
    image: "/images/cms/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg",
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
    image: "/images/cms/1wFj19qQG6zNr7gj3iTlH0Gdlu8.jpeg",
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
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
      className="border-t border-[#333]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5"
        data-cursor="image"
        data-cursor-image={service.image}
      >
        <h3 className="font-heading text-[24px] font-normal leading-[1.3] text-white uppercase lg:text-[32px] lg:leading-[41.6px]">
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
      </div>
    </motion.div>
  );
}

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
              WHAT I CAN DO FOR YOU
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="max-w-[500px] text-lg font-light leading-[27px] text-white"
            >
              As a digital designer, I am a visual storyteller, crafting
              experiences that connect deeply and spark creativity.
            </motion.p>
          </div>

          <div className="flex flex-col">
            {services.map((service, i) => (
              <ServiceAccordionItem
                key={service.number}
                service={service}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

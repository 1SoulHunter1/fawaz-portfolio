"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export interface ServiceItem {
  number: string;
  title: string;
  /** Photo shown by the cursor-following MouseFollower ("image" variant) on hover. */
  image: string;
  items: string[];
}

/**
 * Shared "What I Can Do For You" accordion used on both the Home and About pages.
 * Behaviour (matched 1:1 to portavia.framer.website):
 *  - single-open: opening one item closes the previously open one
 *  - chevron stays white; closed points up (rotate-180), open points down (rotate-0)
 *  - active/hovered heading turns lime (#d0ff71)
 *  - hovering an item shows its associated photo via the cursor follower
 * Content (titles, copy, images) is passed per-page via `services`.
 */
export function ServicesAccordion({
  services,
  className,
}: {
  services: ServiceItem[];
  className?: string;
}) {
  // Single-open accordion: only one item expanded at a time (null = all closed).
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      {services.map((service, i) => {
        const open = openIndex === i;
        return (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            className="border-t border-[#333]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="group flex w-full items-center justify-between py-5 text-left"
              data-cursor="image"
              data-cursor-image={service.image}
              aria-expanded={open}
            >
              <h3
                className={cn(
                  "font-heading text-[24px] font-normal uppercase leading-[1.3] transition-colors duration-300 lg:text-[32px] lg:leading-[41.6px]",
                  open
                    ? "text-[#d0ff71]"
                    : "text-white group-hover:text-[#d0ff71]",
                )}
              >
                {service.number}. {service.title}
              </h3>
              {/* Chevron: closed points up (rotate-180), open points down (rotate-0) */}
              <svg
                width="30"
                height="30"
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
                <ul className="flex flex-col gap-5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-lg font-light leading-[27px] text-white"
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
          </motion.div>
        );
      })}
    </div>
  );
}

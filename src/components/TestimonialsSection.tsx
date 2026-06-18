"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@/components/icons";

function AnimatedPercent({
  end,
  suffix = "%",
}: {
  end: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const testimonials = [
  {
    quote:
      "Duncan truly understood my vision and turned it into impactful designs. The results went beyond my expectations!",
    name: "John Harris",
    title: "Marketing Director",
    avatar: "/images/reviewer-john.jpg",
  },
  {
    quote:
      "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
    name: "Michael Lee",
    title: "Product Manager",
    avatar: "/images/reviewer-michael.jpg",
  },
  {
    quote:
      "His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.",
    name: "Sarah Johnson",
    title: "CEO",
    avatar: "/images/reviewer-sarah.jpg",
  },
  {
    quote:
      "As a small business owner, I appreciated how stress-free Duncan made the process.",
    name: "Laura Bennett",
    title: "Small Business Owner",
    avatar: "/images/reviewer-laura.jpg",
  },
];

const statsData = [
  {
    label: "I've worked with 50+ happy clients",
    value: 98,
    suffix: "%",
    sublabel: "Satisfaction Rate",
  },
  {
    label: "My work helped clients grow their revenue by 200%",
    value: 200,
    suffix: "%",
    sublabel: "Growth",
  },
];

function TestimonialCard({
  quote,
  name,
  title,
  avatar,
}: (typeof testimonials)[0]) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] bg-[#303030] p-6">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4 text-[rgb(106,113,223)]" />
        ))}
      </div>
      <p className="text-base font-light leading-6 text-white">{quote}</p>
      <div className="mt-auto flex items-center gap-3">
        <Image
          src={avatar}
          alt="Reviewer Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-[#b5b5b5]">{title}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  sublabel,
}: (typeof statsData)[0]) {
  return (
    <div className="flex flex-col gap-3 rounded-[20px] bg-[#d0ff71] p-6">
      <p className="text-sm text-black">{label}</p>
      <span className="font-heading text-[60px] font-bold leading-[60px] text-black">
        <AnimatedPercent end={value} suffix={suffix} />
      </span>
      <span className="text-sm text-black">{sublabel}</span>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
          WHAT MY CLIENTS SAY
        </h2>
        <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
          Here&apos;s what my clients have shared about their experiences working
          with me. Their trust and satisfaction motivate me to continue
          delivering designs that make an impact.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="flex flex-col gap-5">
            <TestimonialCard {...testimonials[0]} />
            <TestimonialCard {...testimonials[1]} />
          </div>

          <div className="flex flex-col gap-5">
            {statsData.map((stat) => (
              <StatCard key={stat.sublabel} {...stat} />
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <TestimonialCard {...testimonials[2]} />
            <TestimonialCard {...testimonials[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

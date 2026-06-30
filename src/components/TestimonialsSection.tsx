"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";

const education = [
  {
    degree: "Bachelor of Engineering — Artificial Intelligence & Machine Learning",
    institution: "P.A. College of Engineering, Mangalore (VTU)",
    years: "2023 – Present",
  },
  {
    degree: "12th Grade",
    institution: "Prestige PU College, Mangalore",
    years: "2023",
  },
  {
    degree: "10th Grade",
    institution: "Prestige International School, Mangalore",
    years: "2021",
  },
];

function EducationCard({
  degree,
  institution,
  years,
}: (typeof education)[0]) {
  return (
    <div className="flex flex-col gap-3 rounded-[20px] bg-[#333] p-10">
      <p className="text-base font-bold leading-6 text-white md:text-lg">{degree}</p>
      <p className="text-base font-light leading-6 text-white">{institution}</p>
      <p className="text-xs text-[#b5b5b5]">{years}</p>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            EDUCATION
          </h2>
          <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
            My academic journey in AI and engineering — from school in Mangalore
            to a final-year specialization in Artificial Intelligence &amp; Machine
            Learning.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-5" staggerDelay={0.12}>
          {education.map((entry) => (
            <EducationCard key={entry.years} {...entry} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

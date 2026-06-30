"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";

const faqs = [
  {
    number: "1",
    question: "WHAT DO YOU WORK ON?",
    answer:
      "I work on AI/ML model development, intelligent automation systems, and full-stack web applications — from deepfake detection engines to multi-agent platforms and production-ready apps.",
  },
  {
    number: "2",
    question: "WHAT'S YOUR DEVELOPMENT PROCESS?",
    answer:
      "I start with research and problem framing, build a working prototype fast, iterate based on testing and evaluation metrics, then focus on deployment and documentation.",
  },
  {
    number: "3",
    question: "WHAT TECHNOLOGIES DO YOU WORK WITH?",
    answer:
      "Python, PyTorch, FastAPI, React, Next.js, Docker, and Groq API are my core stack, alongside tools like HuggingFace Transformers, OpenCV, and n8n for automation.",
  },
  {
    number: "4",
    question: "ARE YOU AVAILABLE FOR INTERNSHIPS OR FREELANCE WORK?",
    answer:
      "Yes — I'm actively seeking AI Engineering, Machine Learning, Generative AI, Automation, and Software Development internships, and I take on select freelance projects.",
  },
  {
    number: "5",
    question: "DO YOU WORK SOLO OR WITH A TEAM?",
    answer:
      "Both — most of my hackathon projects are built with small teams, while personal projects like Veritas Neural are solo builds end-to-end.",
  },
  {
    number: "6",
    question: "HOW DO I GET IN TOUCH?",
    answer:
      "Reach out through the contact form on this page or email me directly at sheikfawaz32@gmail.com — I'll respond within 24 hours.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#1a1a1b]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-[120px] md:flex-row md:gap-[80px] md:px-10">
        <div className="flex w-full shrink-0 flex-col gap-[40px] md:w-[440px]">
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base font-light leading-6 text-white">
            Here are answers to some of the most common questions I receive about
            my work and availability. If you don&apos;t see your question here, feel
            free to reach out—I&apos;m happy to help!
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-[30px]">
          {faqs.map((faq, index) => (
            <div key={faq.number} className="flex flex-col">
              <div className="flex pb-[30px]">
                <div className="flex w-[540px] items-start gap-[5px]">
                  <h4 className="font-heading shrink-0 text-[26px] font-normal leading-[33.8px] text-white">
                    {faq.number}.
                  </h4>
                  <h4 className="font-heading text-[26px] font-normal leading-[33.8px] text-white">
                    {faq.question}
                  </h4>
                </div>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex shrink-0 items-start"
                  aria-label={`Toggle ${faq.question}`}
                >
                  <span
                    className={cn(
                      "block rotate-180 text-white transition-transform duration-300",
                      openIndex === index && "!rotate-0"
                    )}
                  >
                    <ChevronDownIcon className="h-[30px] w-[30px]" />
                  </span>
                </button>
              </div>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-base font-light leading-6 text-[#b5b5b5]">
                    {faq.answer}
                  </p>
                </div>
              </div>
              {/* Divider line */}
              <div className="h-px bg-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

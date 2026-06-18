"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";

const faqs = [
  {
    number: "1",
    question: "WHAT SERVICES DO YOU OFFER?",
    answer:
      "I offer a range of digital design services including UI/UX design, graphic design, web design, and branding. Whether you need a new website, a brand identity, or marketing materials, I can help bring your vision to life.",
  },
  {
    number: "2",
    question: "HOW DOES THE DESIGN PROCESS WORK?",
    answer:
      "My process typically involves four phases: Discovery (understanding your needs), Design (creating concepts and prototypes), Development (building the final product), and Delivery (launching and ongoing support).",
  },
  {
    number: "3",
    question: "HOW LONG DOES A PROJECT USUALLY TAKE?",
    answer:
      "Project timelines vary depending on scope and complexity. A simple landing page might take 1-2 weeks, while a full brand identity could take 4-6 weeks. I'll provide a detailed timeline during our initial consultation.",
  },
  {
    number: "4",
    question: "WHAT DO I NEED TO PROVIDE BEFORE STARTING A PROJECT?",
    answer:
      "To get started, I'll need a brief overview of your project goals, target audience, any existing brand guidelines, and examples of designs you admire. The more information you provide, the better I can tailor the results to your needs.",
  },
  {
    number: "5",
    question: "DO YOU OFFER REVISIONS?",
    answer:
      "Yes! I include up to 3 rounds of revisions in my standard packages. Additional revisions can be arranged if needed. My goal is to ensure you're completely satisfied with the final design.",
  },
  {
    number: "6",
    question: "HOW DO I GET STARTED?",
    answer:
      "Simply reach out through the contact form on this page or send me an email at designer@example.com. I'll respond within 24 hours to schedule a free consultation call where we can discuss your project.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[48px] md:leading-[58px]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-4 text-base font-light leading-6 text-white">
            Here are answers to some of the most common questions I receive as a
            freelance designer. If you don&apos;t see your question here, feel
            free to reach out—I&apos;m happy to help!
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={faq.number} className="border-t border-[#333]">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="font-heading text-[22px] font-normal text-white">
                  {faq.number}.
                </span>
                <span className="font-heading flex-1 text-[16px] font-normal leading-[26px] text-white uppercase md:text-[20px] md:leading-[33.8px]">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-[#b5b5b5] transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </span>
              </button>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

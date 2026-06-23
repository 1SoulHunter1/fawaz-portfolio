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
    <section className="w-full bg-[#1a1a1b]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-[120px] md:flex-row md:gap-[80px] md:px-10">
        <div className="flex w-full shrink-0 flex-col gap-[40px] md:w-[440px]">
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base font-light leading-6 text-white">
            Here are answers to some of the most common questions I receive as a
            freelance designer. If you don&apos;t see your question here, feel
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
              <div className="h-px bg-[#333]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

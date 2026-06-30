"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { WaveHandIcon } from "@/components/icons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [cycle, setCycle] = useState(0);
  const showWave = cycle % 2 === 1;
  useEffect(() => {
    const duration = showWave ? 3900 : 2000;
    const timeout = setTimeout(() => setCycle((c) => c + 1), duration);
    return () => clearTimeout(timeout);
  }, [cycle, showWave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="w-full bg-[#1a1a1b] py-[120px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 md:flex-row md:px-10">
        <ScrollReveal direction="left" className="md:flex-1">
          <div className="relative mt-15 mb-16 h-[476px] w-[340px] md:mx-auto md:mb-0">
            <div className="absolute inset-0 overflow-hidden rounded-[20px]">
              <Image
                src="/images/portrait-front.png"
                alt="Portrait of portfolio creator"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-[60px] -left-[62px] flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-[#d0ff71]">
              <div className="relative h-[50px] w-[50px]">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: showWave ? 0 : 1 }}
                  transition={{ duration: 0.07 }}
                >
                  <span className="font-sans text-[32px] font-normal text-[#303030]">
                    Hi
                  </span>
                </motion.div>
                <motion.div
                  key={cycle}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: showWave ? 1 : 0 }}
                  transition={{ duration: 0.07 }}
                >
                  <WaveHandIcon className="h-[50px] w-[50px]" />
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="md:flex-1">
          <div className="flex flex-col gap-5">
            <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
              LET&apos;S WORK TOGETHER
            </h2>
            <p className="max-w-md text-base font-light leading-6 text-white">
              I&apos;m currently exploring new opportunities. Whether you have a project idea,
              a role to fill, or just want to connect, my inbox is always open.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex flex-1 flex-col gap-2.5">
                  <label className="text-sm font-light text-[#d0ff71]">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="relative z-10 rounded-full bg-[#333] px-5 py-3 text-base font-light text-white outline-none placeholder:text-[#b5b5b5]"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2.5">
                  <label className="text-sm font-light text-[#d0ff71]">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="johnsmith@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="relative z-10 rounded-full bg-[#333] px-5 py-3 text-base font-light text-white outline-none placeholder:text-[#b5b5b5]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-light text-[#d0ff71]">
                  Reason for Contact
                </label>
                <div className="relative z-10">
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className={`relative z-10 w-full appearance-none rounded-full bg-[#333] px-5 py-3 pr-12 text-base font-light outline-none ${
                      formData.service === "" ? "text-[#b5b5b5]" : "text-white"
                    }`}
                  >
                    <option value="" className="bg-[#1a1a1b] text-white">
                      Select…
                    </option>
                    <option value="Full-Time / Internship Opportunities" className="bg-[#1a1a1b] text-white">
                      Full-Time / Internship Opportunities
                    </option>
                    <option value="AI & Autonomous Agents Project" className="bg-[#1a1a1b] text-white">
                      AI & Autonomous Agents Project
                    </option>
                    <option value="Workflow Automation" className="bg-[#1a1a1b] text-white">
                      Workflow Automation
                    </option>
                    <option value="Custom Tech Solutions" className="bg-[#1a1a1b] text-white">
                      Custom Tech Solutions
                    </option>
                    <option value="General Inquiry" className="bg-[#1a1a1b] text-white">
                      General Inquiry
                    </option>
                  </select>
                  <svg
                    className="pointer-events-none absolute top-1/2 right-5 z-20 -translate-y-1/2 text-[#b5b5b5]"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-light text-[#d0ff71]">
                  Message
                </label>
                <textarea
                  required
                  placeholder="Hi there! I'm reaching out about..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={2}
                  className="relative z-10 min-h-[140px] w-full resize-y rounded-[20px] bg-[#333] p-5 text-base font-light text-white outline-none placeholder:text-[#b5b5b5]"
                />
              </div>

              <button
                type="submit"
                className="group/cta font-heading relative mt-4 w-fit overflow-hidden rounded-full border border-[#d0ff71] bg-transparent px-10 py-2 text-[26px] font-normal leading-[33.8px] text-[#d0ff71] uppercase"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
                <span className="relative z-10 transition-colors duration-300 group-hover/cta:text-[#303030]">
                  SUBMIT
                </span>
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

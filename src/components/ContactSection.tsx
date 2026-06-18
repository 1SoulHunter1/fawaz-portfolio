"use client";

import { useState } from "react";
import Image from "next/image";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="relative h-[350px] w-[300px] overflow-hidden rounded-[20px]">
            <Image
              src="/images/portrait-front.jpg"
              alt="Portrait of portfolio creator"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#d0ff71]">
            <span className="text-[40px]">👋</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="max-w-md text-base font-light leading-6 text-white">
            Let&apos;s build something impactful together—whether it&apos;s your
            brand, your website, or your next big idea.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border-b border-[#333] bg-transparent py-3 text-base text-white outline-none transition-colors focus:border-[#d0ff71]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border-b border-[#333] bg-transparent py-3 text-base text-white outline-none transition-colors focus:border-[#d0ff71]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Service Needed ?</label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="border-b border-[#333] bg-transparent py-3 text-base text-white outline-none transition-colors focus:border-[#d0ff71]"
            >
              <option value="" className="bg-[#1a1a1b]">
                Select…
              </option>
              <option value="Branding" className="bg-[#1a1a1b]">
                Branding
              </option>
              <option value="Web Design" className="bg-[#1a1a1b]">
                Web Design
              </option>
              <option value="UI / UX" className="bg-[#1a1a1b]">
                UI / UX
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">
              What Can I Help You...
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="resize-none border-b border-[#333] bg-transparent py-3 text-base text-white outline-none transition-colors focus:border-[#d0ff71]"
            />
          </div>

          <button
            type="submit"
            className="font-heading mt-4 w-full rounded-full border border-[#d0ff71] bg-transparent px-6 py-4 text-[26px] font-normal text-[#d0ff71] uppercase transition-colors hover:bg-[#d0ff71] hover:text-black"
          >
            SUBMIT
          </button>
        </form>
        </div>
      </div>
    </section>
  );
}

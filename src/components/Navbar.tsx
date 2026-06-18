"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-10">
      <nav
        className="group flex items-center gap-2 rounded-full bg-[rgba(15,15,15,0.9)] backdrop-blur-[5px] transition-all duration-300"
      >
        {/* Compact view: avatar + badge */}
        <div className="flex items-center gap-2 px-2.5 py-2">
          <Image
            src="/images/avatar.jpg"
            alt="Portfolio Creator Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

          <Link
            href="#contact"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-normal text-white transition-colors hover:text-[#d0ff71]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d0ff71] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d0ff71]" />
            </span>
            Available for work
          </Link>
        </div>

        {/* Expanded nav links - visible on hover (desktop) */}
        <div className="hidden max-w-0 items-center gap-8 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[500px] group-hover:opacity-100 group-hover:pr-4 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-sm text-white transition-colors hover:text-[#d0ff71]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mr-2 flex flex-col gap-1 p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block h-0.5 w-5 bg-white transition-transform",
              menuOpen && "translate-y-1.5 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-white transition-opacity",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-white transition-transform",
              menuOpen && "-translate-y-1.5 -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mt-2 flex flex-col gap-4 rounded-2xl bg-[rgba(15,15,15,0.95)] p-6 backdrop-blur-[5px] lg:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-white transition-colors hover:text-[#d0ff71]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
  ];

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (Math.abs(y - lastScrollY.current) > 5) {
      setExpanded(false);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setExpanded(true), 600);
    }
    lastScrollY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [handleScroll]);

  return (
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <nav
        className="flex items-center rounded-full bg-[rgba(15,15,15,0.9)] px-1 backdrop-blur-[5px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Avatar + Available badge */}
        <div className="flex shrink-0 items-center gap-2 px-2.5 py-2">
          <Image
            src="/images/avatar.jpg"
            alt="Portfolio Creator Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <Link
            href="#contact"
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-normal text-white transition-colors hover:text-[#d0ff71]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d0ff71] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d0ff71]" />
            </span>
            Available for work
          </Link>
        </div>

        {/* Desktop nav links — hidden by default, expand on scroll-stop */}
        <div
          className={cn(
            "hidden items-center gap-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex",
            expanded
              ? "max-w-[400px] opacity-100 pr-3"
              : "max-w-0 opacity-0 pr-0"
          )}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-sm text-white transition-colors duration-200 hover:text-[#d0ff71]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm font-normal text-black transition-opacity hover:opacity-90"
          >
            Contact
          </Link>
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
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-white transition-colors hover:text-[#d0ff71]"
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}

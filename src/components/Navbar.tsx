"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";
import { useNavbarState } from "@/hooks/useNavbarState";
import { AvailableForWorkPill } from "@/components/AvailableForWorkPill";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const layoutTransition = {
  layout: { duration: 0.7, ease: EASE },
};

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="block h-6 cursor-pointer overflow-hidden"
    >
      <motion.div
        animate={{ rotateX: hovered ? -90 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ transformPerspective: 1200, transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
        className="flex flex-col"
      >
        <span className="flex h-6 items-center text-base leading-none font-light text-white">
          {label}
        </span>
        <span
          className="flex h-6 items-center text-base leading-none font-light text-[#d0ff71]"
          style={{ transform: "rotateX(90deg)", transformOrigin: "50% 0%" }}
        >
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

function ContactButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="#contact"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      data-cursor="blend"
      className="relative flex h-10 items-center overflow-hidden rounded-full bg-white px-[30px] py-[3px] pb-1"
    >
      <motion.div
        className="absolute rounded-full bg-[#d0ff71]"
        initial={false}
        animate={
          hovered
            ? {
                width: 180,
                height: 180,
                top: -65,
                right: -31,
                bottom: -75,
                left: -31,
              }
            : {
                width: 20,
                height: 20,
                top: 40,
                right: 118,
                bottom: -20,
                left: -20,
              }
        }
        transition={{ duration: 0.5, ease: EASE }}
      />
      <span className="relative z-10 whitespace-nowrap text-base font-light text-[#303030]">
        Contact
      </span>
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="mt-2 flex flex-col gap-4 rounded-2xl bg-dark-nav p-6 backdrop-blur-[5px] lg:hidden"
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onClose}
          className="text-base font-light text-white transition-colors hover:text-[#d0ff71]"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="#contact"
        onClick={onClose}
        className="text-base font-light text-white transition-colors hover:text-[#d0ff71]"
      >
        Contact
      </Link>
    </motion.div>
  );
}

export function Navbar() {
  const { expanded } = useNavbarState();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE, delay: 0.1 }}
      className="fixed top-[20px] left-1/2 z-50 -translate-x-1/2"
    >
      <LayoutGroup>
        <motion.nav
          layout
          transition={layoutTransition}
          className="flex items-center rounded-[28px] bg-dark-nav px-[10px] py-2 backdrop-blur-[5px]"
        >
          {/* Avatar — always visible */}
          <motion.div layout="position" className="shrink-0">
            <Image
              src="/images/main_avatar.png"
              alt="Portfolio Creator Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>

          {/* Desktop nav links — visible when expanded */}
          <AnimatePresence mode="popLayout">
            {expanded && (
              <motion.div
                key="nav-links"
                layout
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE }}
                className="hidden items-center gap-10 pl-10 lg:flex"
              >
                <div className="flex items-center gap-5">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>
                <ContactButton />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Available for work pill — visible when collapsed */}
          <AnimatePresence mode="popLayout">
            {!expanded && (
              <motion.div
                key="available-pill"
                layout
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE }}
                className="hidden lg:flex"
              >
                <AvailableForWorkPill />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile: always show Available for Work pill */}
          <div className="lg:hidden">
            <AvailableForWorkPill />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mr-1 flex flex-col gap-1 p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform duration-300",
                menuOpen && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-opacity duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform duration-300",
                menuOpen && "-translate-y-1.5 -rotate-45"
              )}
            />
          </button>
        </motion.nav>
      </LayoutGroup>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

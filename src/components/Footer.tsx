import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  XIcon,
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
} from "@/components/icons";

const socials = [
  { icon: XIcon, href: "https://x.com/", label: "X" },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  { icon: BehanceIcon, href: "https://www.behance.net/", label: "Behance" },
  { icon: DribbbleIcon, href: "https://dribbble.com/", label: "Dribbble" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#d0ff71] py-6">
      <ScrollReveal direction="none">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 md:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-light text-[rgb(48,48,48)]">Email:</span>
            <a
              href="mailto:designer@example.com"
              className="text-lg font-light text-[rgb(48,48,48)] transition-opacity hover:opacity-70"
            >
              designer@example.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-light text-[rgb(48,48,48)]">
              Call Today:
            </span>
            <a
              href="tel:+1 (555) 123-4567"
              className="text-lg font-light text-[rgb(48,48,48)] transition-opacity hover:opacity-70"
            >
              +1 (555) 123-4567
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-80"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start gap-1 md:items-end">
          <p className="text-xs text-black/60">
            © Copyright 2025. All Rights Reserved by{" "}
            <a
              href="https://www.framer.com/@duncan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-opacity hover:opacity-70"
            >
              oldshen
            </a>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-black/60">Created by</span>
            <Image
              src="/images/creator-logo.png"
              alt="Creator Logo"
              width={20}
              height={20}
            />
            <a
              href="https://x.com/ShenDuncan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/60 transition-opacity hover:opacity-70"
            >
              Duncan Shen
            </a>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </footer>
  );
}

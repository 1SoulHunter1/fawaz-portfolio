import Image from "next/image";
import Link from "next/link";
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
    <footer className="w-full bg-[#d0ff71]">
      <ScrollReveal direction="none">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-6 py-10 md:px-10">
          {/* Top row: Email | Phone | Social */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-2.5">
            {/* Email */}
            <div className="flex-1">
              <p className="text-sm font-light leading-[21px] text-[#303030]">
                Email :
              </p>
              <a
                href="mailto:designer@example.com"
                className="text-lg font-semibold leading-[23.4px] text-[#303030] transition-opacity hover:opacity-70"
              >
                designer@example.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex-1 md:flex md:justify-center">
              <div>
                <p className="text-sm font-light leading-[21px] text-[#303030]">
                  Call Today :
                </p>
                <a
                  href="tel:+15551234567"
                  className="text-lg font-semibold leading-[23.4px] text-[#303030] transition-opacity hover:opacity-70"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex-1 md:flex md:justify-end">
              <div>
                <p className="text-sm font-light leading-[21px] text-[#303030]">
                  Social :
                </p>
                <div className="flex items-center gap-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-6 w-6 items-center justify-center text-[#303030] transition-opacity hover:opacity-60"
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#303030]" />

          {/* Bottom row: Copyright | Creator */}
          <div className="flex min-h-[40px] flex-col gap-2 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="text-sm font-light leading-[21px] text-[#303030]">
                &copy; Copyright 2025. All Rights Reserved by{" "}
                <a
                  href="https://www.framer.com/@duncan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  oldshen
                </a>
              </p>
            </div>
            <div className="flex flex-1 items-center gap-2.5 md:justify-end">
              <p className="text-sm font-light leading-[21px] text-[#303030]">
                Created by
              </p>
              <Image
                src="/images/creator-logo.png"
                alt="Creator Logo"
                width={40}
                height={40}
              />
              <a
                href="https://x.com/ShenDuncan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light leading-[21px] text-[#303030] transition-opacity hover:opacity-70"
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

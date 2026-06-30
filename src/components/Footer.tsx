import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/icons";

const socials = [
  { icon: GithubIcon, href: "https://github.com/1SoulHunter1", label: "GitHub" },
  {
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/sheik-mohammad-fawaz-83605a291",
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#d0ff71]" data-cursor="blend">
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
                href="mailto:sheikfawaz32@gmail.com"
                className="text-lg font-semibold leading-[23.4px] text-[#303030] transition-opacity hover:opacity-70"
              >
                sheikfawaz32@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex-1 md:flex md:justify-center">
              <div>
                <p className="text-sm font-light leading-[21px] text-[#303030]">
                  Phone :
                </p>
                <a
                  href="tel:+917019644596"
                  className="text-lg font-semibold leading-[23.4px] text-[#303030] transition-opacity hover:opacity-70"
                >
                  +91 7019644596
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


        </div>
      </ScrollReveal>
    </footer>
  );
}

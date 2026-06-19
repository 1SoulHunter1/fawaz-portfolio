import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  external?: boolean;
}

export function CtaButton({
  href,
  children,
  className,
  showArrow = true,
  external = false,
}: CtaButtonProps) {
  const classes = cn(
    "group/cta font-heading relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#d0ff71] px-8 py-3 text-[18px] font-normal text-[#d0ff71] uppercase md:text-[20px]",
    className
  );

  const content = (
    <>
      <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover/cta:text-black">
        {children}
        {showArrow && (
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
        )}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-cursor="blend"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-cursor="blend">
      {content}
    </Link>
  );
}

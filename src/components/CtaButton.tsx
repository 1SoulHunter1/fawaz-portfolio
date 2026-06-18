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

/**
 * Pill CTA button matching the homepage "BROWSE ALL PROJECTS" style:
 * lime outline that fills on hover, Antonio uppercase label, trailing arrow.
 */
export function CtaButton({
  href,
  children,
  className,
  showArrow = true,
  external = false,
}: CtaButtonProps) {
  const classes = cn(
    "group/cta font-heading inline-flex items-center justify-center gap-3 rounded-full border border-[#d0ff71] px-8 py-3 text-[18px] font-normal text-[#d0ff71] uppercase transition-colors hover:bg-[#d0ff71] hover:text-black md:text-[20px]",
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ContentSection } from "@/types";

interface ContentBlockProps {
  section: ContentSection;
  /** Heading element + size. Project detail uses h3/32px, blog detail uses h2/40px. */
  headingTag?: "h2" | "h3";
  headingClassName?: string;
  /** Append " :" after the heading (project case-study style). */
  colon?: boolean;
}

export function ContentBlock({
  section,
  headingTag = "h3",
  headingClassName,
  colon = false,
}: ContentBlockProps) {
  const Heading = headingTag;
  const imgs = section.images;

  return (
    <div className="flex flex-col gap-6">
      <Heading
        className={cn(
          "font-heading text-[26px] font-normal leading-tight text-white md:text-[32px]",
          headingClassName
        )}
      >
        {section.heading}
        {colon ? " :" : ""}
      </Heading>

      {section.paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-base font-light leading-[27px] text-white md:text-lg"
        >
          {p}
        </p>
      ))}

      {imgs.length > 0 && (
        <div
          className={cn(
            "grid gap-5",
            imgs.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          )}
        >
          {imgs.map((src, i) => (
            <div
              key={i}
              className={cn(
                "relative w-full overflow-hidden rounded-[20px]",
                imgs.length > 1 ? "aspect-[4/3]" : "aspect-[16/9]"
              )}
            >
              <Image
                src={src}
                alt={`${section.heading} image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

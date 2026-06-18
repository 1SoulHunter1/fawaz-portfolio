import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "compact";
}

/**
 * Project card with two layouts:
 * - "featured": full-width cover with centered overlay text (homepage / projects hero)
 * - "compact": cover on top, category + title + description below (More Projects grids)
 */
export function ProjectCard({ project, variant = "featured" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  if (variant === "compact") {
    return (
      <Link href={href} className="group block">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <span className="mt-4 block text-sm font-light text-[#d0ff71]">
          {project.category}
        </span>
        <h3 className="font-heading mt-1 text-[24px] font-normal leading-[32px] text-white uppercase md:text-[32px] md:leading-[41.6px]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-light leading-[21px] text-[#b5b5b5]">
          {project.description}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative block aspect-[3/2] w-full overflow-hidden rounded-[20px]"
    >
      <Image
        src={project.cover}
        alt={project.title}
        fill
        sizes="(max-width: 1200px) 100vw, 1120px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-8 text-center">
        <span className="text-sm font-light text-[#b5b5b5]">
          {project.category}
        </span>
        <h3 className="font-heading max-w-[756px] text-[32px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
          {project.title}
        </h3>
        <p className="max-w-[600px] text-sm font-light leading-[21px] text-white/80">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

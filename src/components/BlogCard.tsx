import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  blog: BlogPost;
  variant?: "default" | "pinned";
}

/**
 * Blog card with two layouts:
 * - "default": bordered card, cover on top, badge + date + title + excerpt
 * - "pinned": large two-column featured card for the "Most Viewed" post
 */
export function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const href = `/blogs/${blog.slug}`;

  if (variant === "pinned") {
    return (
      <Link
        href={href}
        className="group overflow-hidden rounded-2xl border border-[#333] transition-colors hover:border-[#d0ff71]"
        data-cursor="arrow"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={blog.cover}
            alt={blog.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1120px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-4 p-8">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-[#303030] px-3 py-1 text-xs text-white">
              {blog.category}
            </span>
            <span className="text-xs text-[#b5b5b5]">{blog.date}</span>
          </div>
          <h3 className="font-heading text-[24px] font-normal leading-[32px] text-white uppercase md:text-[32px] md:leading-[41.6px]">
            {blog.title}
          </h3>
          <p className="text-base font-light leading-6 text-[#b5b5b5]">
            {blog.excerpt}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-[#333] transition-colors hover:border-[#d0ff71]"
      data-cursor="arrow"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={blog.cover}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 540px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <span className="inline-block rounded-full bg-[#303030] px-3 py-1 text-xs text-white">
            {blog.category}
          </span>
          <span className="text-xs text-[#b5b5b5]">{blog.date}</span>
        </div>
        <h3 className="font-heading mt-3 text-[24px] font-normal leading-[32px] text-white uppercase md:text-[32px] md:leading-[41.6px]">
          {blog.title}
        </h3>
        <p className="mt-2 text-sm font-light leading-[21px] text-[#b5b5b5]">
          {blog.excerpt}
        </p>
      </div>
    </Link>
  );
}

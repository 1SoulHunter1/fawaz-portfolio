import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  blog: BlogPost;
  variant?: "default" | "pinned";
}

export function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const href = `/blogs/${blog.slug}`;

  if (variant === "pinned") {
    return (
      <Link
        href={href}
        className="group flex flex-col gap-5"
        data-cursor="arrow"
      >
        <div className="relative w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: "1120/500" }}>
          <Image
            src={blog.cover}
            alt={blog.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1120px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-[20px] bg-[#d0ff71] px-5 py-2.5">
            <h4 className="font-heading text-[26px] font-normal leading-[1.3] text-[#303030]">
              Most Viewed
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-light text-[#d0ff71]">
            {blog.category}
          </span>
          <span className="text-sm font-light text-white">
            {blog.date}
          </span>
        </div>
        <h3 className="font-heading text-[24px] font-normal leading-[32px] text-white uppercase md:text-[32px] md:leading-[41.6px]">
          {blog.title}
        </h3>
        <p className="text-sm font-light leading-[21px] text-white">
          {blog.excerpt}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col gap-5"
      data-cursor="arrow"
    >
      <div className="relative aspect-[27/16] w-full overflow-hidden rounded-[20px]">
        <Image
          src={blog.cover}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 540px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-2.5">
        <span className="rounded-full px-[15px] py-[3px] text-sm font-light leading-[21px] text-[#d0ff71]">
          {blog.category}
        </span>
        <span className="text-sm font-light leading-[21px] text-white">
          {blog.date}
        </span>
      </div>
      <h3 className="font-heading text-[24px] font-normal leading-[32px] text-white uppercase md:text-[32px] md:leading-[41.6px]">
        {blog.title}
      </h3>
      <p className="text-sm font-light leading-[21px] text-white">
        {blog.excerpt}
      </p>
    </Link>
  );
}

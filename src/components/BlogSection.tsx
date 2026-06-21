import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { ArrowRightIcon } from "@/components/icons";

const blogs = [
  {
    slug: "5-design-trends-that-will-define-2024",
    image: "/images/blog-design-trends.jpeg",
    category: "Insights",
    date: "Apr 30, 2025",
    title: "5 DESIGN TRENDS THAT WILL DEFINE 2024",
    description:
      "Explore the top design trends for 2024 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
  },
  {
    slug: "how-to-streamline-your-design-workflow",
    image: "/images/blog-workflow.jpeg",
    category: "Tutorials",
    date: "Apr 27, 2025",
    title: "HOW TO STREAMLINE YOUR DESIGN WORKFLOW",
    description:
      "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
  },
];

export function BlogSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            DESIGN INSIGHTS & IDEAS
          </h2>
          <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
            From design trends to creative processes, these articles offer insights
            to help you elevate your craft, solve challenges, and spark new ideas
            for your projects.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-2" staggerDelay={0.15}>
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#333] transition-transform hover:scale-[1.02]"
              data-cursor="arrow"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt="Blog Cover Image"
                  fill
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
                  {blog.description}
                </p>
              </div>
            </Link>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={0.2}>
        <Link
          href="/blogs"
          className="group/cta relative mt-10 inline-flex h-[48px] items-center gap-3 overflow-hidden rounded-full border border-[#d0ff71] px-8 font-heading text-[26px] font-normal text-[#d0ff71] uppercase"
          data-cursor="blend"
        >
          <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
          <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover/cta:text-black">
            BROWSE ALL INSIGHTS
            <ArrowRightIcon className="h-6 w-6" />
          </span>
        </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

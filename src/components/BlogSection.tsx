import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { ArrowRightIcon } from "@/components/icons";

const blogs = [
  {
    slug: "building-a-4-modality-deepfake-detection-engine",
    image: "/images/cms/blog-deepfake-detection.jpg",
    category: "Deep Learning",
    date: "Jun 15, 2025",
    title: "BUILDING A 4-MODALITY DEEPFAKE DETECTION ENGINE",
    description:
      "How I built Veritas Neural — a deepfake detection system combining face, voice, video, and text analysis using PyTorch and EfficientNet.",
  },
  {
    slug: "autonomous-linkedin-ats-pipeline-with-n8n-gemini-and-supabase",
    image: "/images/cms/blog-linkedin-automation.jpg",
    category: "Automation",
    date: "May 28, 2025",
    title: "AUTONOMOUS LINKEDIN ATS PIPELINE WITH N8N, GEMINI & SUPABASE",
    description:
      "How I built an end-to-end n8n workflow that scrapes LinkedIn internships, tailors ATS-optimized resumes with Gemini, and delivers a daily digest.",
  },
];

export function BlogSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            AI INSIGHTS & IDEAS
          </h2>
          <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
            Writeups on AI systems, automation workflows, and lessons from
            building real-world ML projects.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-x-10 gap-y-20 md:grid-cols-2" staggerDelay={0.15}>
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group flex flex-col gap-5"
              data-cursor="arrow"
            >
              <div className="relative aspect-[27/16] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={blog.image}
                  alt="Blog Cover Image"
                  fill
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
                {blog.description}
              </p>
            </Link>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={0.2}>
        <Link
          href="/blogs"
          className="group/cta relative mt-10 inline-flex h-[48px] items-center gap-3 overflow-hidden rounded-full border border-accent px-8 font-heading text-[26px] font-normal text-[#d0ff71] uppercase"
          data-cursor="arrow"
        >
          <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
          <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover/cta:text-[#303030]">
            BROWSE ALL INSIGHTS
            <ArrowRightIcon className="h-6 w-6" />
          </span>
        </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

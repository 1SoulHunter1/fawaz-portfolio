import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blogs — Portavia",
  description:
    "Design insights, tutorials and ideas on web, UI/UX and branding.",
};

export default function BlogsPage() {
  const pinned = blogs.find((b) => b.pinned);
  const rest = blogs.filter((b) => !b.pinned);

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full bg-[#1a1a1b] pt-36 pb-[120px] md:pt-44">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <ScrollReveal>
              <h1 className="font-heading text-[44px] font-bold leading-[1.05] tracking-[-1.5px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]">
                Design Insights &amp; Ideas
              </h1>
              <p className="mt-5 max-w-[500px] text-lg font-light leading-[27px] text-white">
                From design trends to creative processes, these articles offer
                insights to help you elevate your craft, solve challenges, and
                spark new ideas for your projects.
              </p>
            </ScrollReveal>

            {pinned && (
              <ScrollReveal className="mt-10">
                <BlogCard blog={pinned} variant="pinned" />
              </ScrollReveal>
            )}

            <StaggerReveal className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-2" staggerDelay={0.1}>
              {rest.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

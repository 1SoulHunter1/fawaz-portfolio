import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
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
        <section className="w-full bg-[#1a1a1b] pt-36 pb-16 md:pt-44">
          <div className="mx-auto max-w-[1200px] px-6">
            <h1 className="font-heading text-[44px] font-bold leading-[1.05] tracking-[-1.5px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]">
              Design Insights &amp; Ideas
            </h1>
            <p className="mt-6 max-w-[640px] text-lg font-light leading-[27px] text-white">
              From design trends to creative processes, these articles offer
              insights to help you elevate your craft, solve challenges, and
              spark new ideas for your projects.
            </p>
          </div>
        </section>

        {pinned && (
          <section className="w-full bg-[#1a1a1b] pb-16">
            <div className="mx-auto max-w-[1200px] px-6">
              <h2 className="font-heading mb-6 inline-block rounded-full bg-[#d0ff71] px-5 py-1.5 text-[20px] font-normal text-black uppercase md:text-[26px]">
                Most Viewed
              </h2>
              <BlogCard blog={pinned} variant="pinned" />
            </div>
          </section>
        )}

        <section className="w-full bg-[#1a1a1b] pb-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

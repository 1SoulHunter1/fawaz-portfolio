import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { ContentBlock } from "@/components/ContentBlock";
import { CtaButton } from "@/components/CtaButton";
import { blogs, getBlog } from "@/data/blogs";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return { title: "Blog — Portavia" };
  return { title: `${blog.title} — Portavia`, description: blog.excerpt };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="w-full bg-[#1a1a1b] pt-36 pb-12 md:pt-44">
          <div className="mx-auto max-w-[1000px] px-6">
            <h1 className="font-heading text-[40px] font-bold leading-[1.05] tracking-[-1.5px] text-white uppercase lg:text-[88px] lg:leading-[96px] lg:tracking-[-3px]">
              {blog.title}
            </h1>
            <p className="mt-6 max-w-[720px] text-lg font-light leading-[27px] text-white">
              {blog.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-light text-[#d0ff71]">
                {blog.category}
              </span>
              <span className="text-sm text-[#b5b5b5]">{blog.date}</span>
            </div>

            <div className="relative mt-10 aspect-[3/2] w-full overflow-hidden rounded-[20px]">
              <Image
                src={blog.cover}
                alt={blog.title}
                fill
                sizes="(max-width: 1000px) 100vw, 1000px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="w-full bg-[#1a1a1b] py-12">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-14 px-6">
            {blog.sections.map((section) => (
              <ContentBlock
                key={section.heading}
                section={section}
                headingTag="h2"
                headingClassName="md:text-[40px]"
              />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full bg-[#1a1a1b] py-12">
          <div className="mx-auto max-w-[1000px] px-6">
            <div className="flex flex-col items-start gap-5 rounded-[20px] bg-[#d0ff71] p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-[26px] font-normal leading-tight text-[#303030] md:text-[32px]">
                  Like what you see? There&apos;s more.
                </h3>
                <p className="max-w-[480px] text-sm font-light text-[#303030]">
                  Get monthly inspiration, blog updates, and creative process
                  notes — handcrafted for fellow creators.
                </p>
              </div>
              <a
                href="#subscribe"
                className="font-heading inline-flex shrink-0 items-center rounded-full bg-[#1a1a1b] px-8 py-3 text-[20px] font-normal text-[#d0ff71] uppercase transition-opacity hover:opacity-90 md:text-[26px]"
              >
                Subscribe
              </a>
            </div>
          </div>
        </section>

        {/* More to Discover */}
        <section className="w-full bg-[#1a1a1b] pb-24 pt-8">
          <div className="mx-auto max-w-[1200px] px-6">
            <h3 className="font-heading text-[28px] font-normal leading-tight text-white uppercase md:text-[32px]">
              More to Discover
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((b) => (
                <BlogCard key={b.slug} blog={b} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <CtaButton href="/blogs" showArrow={false}>
                Load More
              </CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

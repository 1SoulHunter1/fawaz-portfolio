import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ContentBlock } from "@/components/ContentBlock";
import { CtaButton } from "@/components/CtaButton";
import { GithubIcon, ExternalLinkIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project — Portavia" };
  return {
    title: `${project.title} — Portavia`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [
    { label: "Year", value: project.year },
    { label: "Domain", value: project.industry },
    { label: "Context", value: project.client },
    { label: "Timeline", value: project.duration },
  ].filter((m) => m.value);

  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 6);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero + metadata */}
        <section className="w-full bg-[#1a1a1b] pt-36 pb-12 md:pt-44">
          <div className="mx-auto max-w-[1000px] px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-full bg-[#d0ff71] px-4 py-1 text-sm font-light text-[#303030]">
                  {project.category}
                </span>
                <span className="inline-block rounded-full border border-[#333] px-4 py-1 text-sm font-light text-white">
                  New release
                </span>
              </div>
              <h1 className="font-heading mt-6 text-[48px] font-bold leading-[1.05] tracking-[-2px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-[720px] text-lg font-light leading-[27px] text-white">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaButton href={project.githubUrl} external showArrow={false}>
                  <GithubIcon className="h-5 w-5" />
                  View on GitHub
                </CtaButton>
                {project.liveUrl && (
                  <CtaButton href={project.liveUrl} external showArrow={false}>
                    <ExternalLinkIcon className="h-5 w-5" />
                    Live Demo
                  </CtaButton>
                )}
              </div>
            </ScrollReveal>

            {meta.length > 0 && (
              <StaggerReveal className="mt-12 grid grid-cols-2 gap-6 border-t border-[#333] pt-8 md:grid-cols-4" staggerDelay={0.08}>
                {meta.map((m) => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <span className="text-lg font-light text-white">
                      {m.label} :
                    </span>
                    <span className="text-lg font-semibold text-[#d0ff71]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </StaggerReveal>
            )}
          </div>
        </section>

        {/* Cover */}
        <section className="w-full bg-[#1a1a1b]">
          <div className="mx-auto max-w-[1000px] px-6">
            <ScrollReveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1000px) 100vw, 1000px"
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Content blocks */}
        <section className="w-full bg-[#1a1a1b] py-16">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-14 px-6">
            {project.sections.map((section) => (
              <ScrollReveal key={section.heading}>
                <ContentBlock section={section} colon />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* More projects */}
        <section className="w-full bg-[#1a1a1b] pb-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                More Projects
              </h2>
            </ScrollReveal>
            <StaggerReveal className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2" staggerDelay={0.08}>
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="compact" />
              ))}
            </StaggerReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-12 flex justify-center">
                <CtaButton href="/projects" showArrow={false}>
                  Load More
                </CtaButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Portavia",
  description:
    "Featured design projects spanning branding, UI/UX, web design and graphic design.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full bg-[#1a1a1b] pt-36 pb-[120px] md:pt-44">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <ScrollReveal>
              <h1 className="font-heading text-[56px] font-bold leading-[1.05] tracking-[-2px] text-white uppercase lg:text-[120px] lg:leading-[132px] lg:tracking-[-3.6px]">
                Featured Projects
              </h1>
              <p className="mt-5 max-w-[500px] text-lg font-light leading-[27px] text-white">
                These selected projects reflect my passion for blending strategy
                with creativity — solving real problems through thoughtful design
                and impactful storytelling.
              </p>
            </ScrollReveal>

            <div className="mt-10">
              {featured.map((project, i) => (
                <div
                  key={project.slug}
                  className="sticky top-[80px] z-[1]"
                  style={{ paddingBottom: i < featured.length - 1 ? "120px" : "0" }}
                >
                  <ProjectCard project={project} variant="featured" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#1a1a1b] pb-[120px]">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <ScrollReveal>
              <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                More Projects
              </h2>
            </ScrollReveal>
            <StaggerReveal className="mt-10 grid gap-x-10 gap-y-20 md:grid-cols-2" staggerDelay={0.1}>
              {more.map((project) => (
                <ProjectCard key={project.slug} project={project} variant="compact" />
              ))}
            </StaggerReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

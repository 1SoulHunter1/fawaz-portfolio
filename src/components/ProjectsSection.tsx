import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ArrowRightIcon } from "@/components/icons";

const projects = [
  {
    slug: "summer-vibes-festival-campaign",
    image: "/images/project-summer-vibes.jpeg",
    category: "Graphic Design",
    title: "SUMMER VIBES FESTIVAL CAMPAIGN",
    description:
      'Created promotional materials for the "Summer Vibes Festival," including posters, flyers, and social media graphics.',
  },
  {
    slug: "coral-spiral-abstract",
    image: "/images/project-coral-spiral.jpg",
    category: "Branding",
    title: "CORAL SPIRAL ABSTRACT",
    description:
      "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and a soft pink gradient background, emphasizing modern digital aesthetics and organic geometry.",
  },
  {
    slug: "shopease-redesign-sprint",
    image: "/images/project-shopease.jpeg",
    category: "UI / UX Design",
    title: "SHOPEASE REDESIGN SPRINT",
    description:
      'Redesigned the "ShopEase" e-commerce app to enhance user experience. Focused on simplifying navigation, optimizing the checkout process, and incorporating a sleek.',
  },
  {
    slug: "black-geometric-prisms",
    image: "/images/project-black-prisms.jpeg",
    category: "Branding",
    title: "BLACK GEOMETRIC PRISMS",
    description:
      "A collection of sharp, angular black prisms floating against a gradient dark background, showcasing a modern and sophisticated approach to digital 3D geometric composition.",
  },
];

export function ProjectsSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            FEATURED PROJECTS
          </h2>
          <p className="mt-4 max-w-[700px] text-base font-light leading-6 text-white">
            These selected projects reflect my passion for blending strategy with
            creativity — solving real problems through thoughtful design and
            impactful storytelling.
          </p>
        </ScrollReveal>

        {/* Sticky stacking: each card pins at top: 80px, later cards paint over earlier ones via DOM order */}
        <div className="mt-12">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="sticky top-[80px] z-[1]"
              style={{ paddingBottom: i < projects.length - 1 ? "120px" : "0" }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block aspect-[3/2] w-full overflow-hidden rounded-[20px]"
                data-cursor="arrow"
              >
                <Image
                  src={project.image}
                  alt="Featured Project Cover Image"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <span className="text-sm font-light text-[#b5b5b5]">
                    {project.category}
                  </span>
                  <h2 className="font-heading max-w-[756px] text-[32px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
                    {project.title}
                  </h2>
                  <p className="max-w-[600px] text-sm font-light leading-[21px] text-white/80">
                    {project.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group/cta font-heading relative inline-flex h-[48px] items-center gap-3 overflow-hidden rounded-full border border-[#d0ff71] px-8 text-[22px] font-normal text-[#d0ff71] uppercase md:text-[26px]"
            data-cursor="blend"
          >
            <span className="absolute inset-0 scale-0 rounded-full bg-[#d0ff71] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-100" />
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover/cta:text-black">
              BROWSE ALL PROJECTS
              <ArrowRightIcon className="h-6 w-6" />
            </span>
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { CheckCircleIcon } from "@/components/icons";

const services = [
  {
    number: "1",
    title: "UI/UX DESIGN",
    items: [
      "Wireframing and prototyping",
      "User Interface design for web and mobile apps",
      "Usability testing and user feedback analysis",
      "Interaction design and micro-animations",
    ],
  },
  {
    number: "2",
    title: "GRAPHIC DESIGN",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
  },
  {
    number: "3",
    title: "WEB DESIGN",
    items: [
      "Responsive website design",
      "Landing page design and optimization",
      "Webflow development and customization",
      "Website maintenance and updates",
    ],
  },
  {
    number: "4",
    title: "BRANDING",
    items: [
      "Brand strategy and identity development",
      "Visual style guide creation",
      "Typography and color scheme selection",
      "Brand storytelling and messaging",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="w-full bg-[#1a1a1b] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <ScrollReveal>
          <h2 className="font-heading text-[36px] font-bold leading-tight text-white uppercase md:text-[60px] md:leading-[78px]">
            WHAT I CAN DO FOR YOU
          </h2>
          <p className="mt-4 max-w-[600px] text-base font-light leading-6 text-white">
            As a digital designer, I am a visual storyteller, crafting experiences
            that connect deeply and spark creativity.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 flex flex-col" staggerDelay={0.1}>
          {services.map((service) => (
            <div
              key={service.number}
              className="border-t border-[#333] py-10 pr-8"
            >
              <h3 className="font-heading text-[32px] font-normal leading-[41.6px] text-white uppercase">
                {service.number}. {service.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base font-light text-[#b5b5b5]"
                  >
                    <span className="mt-0.5 w-5 shrink-0 text-[rgb(106,113,223)]">
                      <CheckCircleIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

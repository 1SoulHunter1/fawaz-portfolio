import { Navbar } from "@/components/Navbar";
import { StickyScrollSection } from "@/components/StickyScrollSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <StickyScrollSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

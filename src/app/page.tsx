import { Navbar } from "@/components/Navbar";
import { StickyScrollSection } from "@/components/StickyScrollSection";
import { ProjectsSection } from "@/components/ProjectsSection";
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
        <FAQSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

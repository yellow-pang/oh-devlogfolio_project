import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectList } from "@/components/portfolio/ProjectList";
import { SkillSection } from "@/components/portfolio/SkillSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Separator } from "@/components/ui/separator";
import { getAllProjects } from "@/lib/services/projects";

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <div className="relative">
      <HeroSection />
      <Separator />
      <ProjectList projects={projects} />
      <Separator />
      <SkillSection />
      <Separator />
      <ContactSection />
    </div>
  );
}

import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectList } from "@/components/portfolio/ProjectList";
import { SkillSection } from "@/components/portfolio/SkillSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { RecentPostsSection } from "@/components/blog/RecentPostsSection";
import { Separator } from "@/components/ui/separator";
import { getAllProjects } from "@/lib/services/projects";
import { getPublishedPosts } from "@/lib/services/posts";

export default async function HomePage() {
  const [projects, allPosts] = await Promise.all([
    getAllProjects(),
    getPublishedPosts(),
  ]);
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="relative">
      <HeroSection />
      <Separator />
      <ProjectList projects={projects} />
      <Separator />
      <SkillSection />
      <Separator />
      <RecentPostsSection posts={recentPosts} />
      <Separator />
      <ContactSection />
    </div>
  );
}

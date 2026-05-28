"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectList } from "@/components/portfolio/ProjectList";
import { SkillSection } from "@/components/portfolio/SkillSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { RecentPostsSection } from "@/components/blog/RecentPostsSection";
import { Separator } from "@/components/ui/separator";
import { getAllProjects } from "@/lib/services/projects";
import { getPublishedPosts } from "@/lib/services/posts";
import { getSiteSettings } from "@/lib/services/siteSettings";
import { Project } from "@/types/project";
import { Post } from "@/types/post";
import { SiteSettings } from "@/types/siteSettings";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllProjects().then(setProjects),
      getPublishedPosts().then((posts) => setRecentPosts(posts.slice(0, 3))),
      getSiteSettings().then(setSiteSettings),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative">
      <HeroSection
        settings={siteSettings?.hero}
        contact={siteSettings?.contact}
      />
      <Separator />
      {!loading && <ProjectList projects={projects} />}
      <Separator />
      <SkillSection skills={siteSettings?.skills} />
      <Separator />
      <RecentPostsSection posts={recentPosts} />
      <Separator />
      <ContactSection contact={siteSettings?.contact} />
    </div>
  );
}

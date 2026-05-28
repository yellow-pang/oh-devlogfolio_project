import { getAllProjects } from "@/lib/services/projects";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return projects.map((project) => ({ slug: project.id }));
  } catch (error) {
    console.error("[generateStaticParams] Firestore 호출 실패:", error);
    return [];
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ProjectDetailClient id={slug} />;
}

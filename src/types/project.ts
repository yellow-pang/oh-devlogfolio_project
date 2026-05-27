export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnailUrl: string;
  tags: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt">;

export type ProjectType = "personal" | "team" | "side" | "hackathon";
export type ProjectStatus = "completed" | "in-progress" | "paused";

export interface ProjectChallenge {
  problem: string;
  solution: string;
}

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
  // 프로젝트 기본 정보
  projectType?: ProjectType;
  teamSize?: number;
  startDate?: string;
  endDate?: string;
  status?: ProjectStatus;
  // 역할 및 기여
  role?: string;
  contribution?: string;
  responsibilities?: string[];
  // 상세 내용
  keyFeatures?: string[];
  challenges?: ProjectChallenge[];
  achievements?: string[];
  screenshots?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt">;

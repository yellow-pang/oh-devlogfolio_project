"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "@/lib/services/projects";
import { ProjectFilter } from "@/components/portfolio/ProjectFilter";
import { PageHeader } from "@/components/common/PageHeader";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader
        title="프로젝트"
        description="개발하며 진행한 프로젝트들을 기술 스택으로 필터링해 볼 수 있습니다."
      />

      {loading ? (
        <p className="text-center text-muted-foreground py-16">불러오는 중...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          아직 등록된 프로젝트가 없습니다.
        </p>
      ) : (
        <ProjectFilter projects={projects} />
      )}
    </div>
  );
}

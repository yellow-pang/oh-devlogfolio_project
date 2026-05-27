"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { TagBadge } from "@/components/common/TagBadge";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";

interface ProjectFilterProps {
  projects: Project[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) =>
      project.techStack.forEach((tech) => techSet.add(tech))
    );
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTech === null) return projects;
    return projects.filter((project) =>
      project.techStack.includes(selectedTech)
    );
  }, [projects, selectedTech]);

  const handleTechClick = (tech: string) => {
    setSelectedTech((prev) => (prev === tech ? null : tech));
  };

  return (
    <div className="space-y-8">
      {/* 기술 스택 필터 */}
      {allTechStacks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              기술 스택으로 필터링
            </span>
            {selectedTech && (
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3" />
                초기화
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTechStacks.map((tech) => (
              <Badge
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleTechClick(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 결과 수 */}
      <p className="text-sm text-muted-foreground">
        {selectedTech ? (
          <>
            <span className="font-medium text-foreground">{selectedTech}</span>
            {" 프로젝트 "}
            <span className="font-medium text-foreground">
              {filteredProjects.length}
            </span>
            개
          </>
        ) : (
          <>
            전체{" "}
            <span className="font-medium text-foreground">
              {filteredProjects.length}
            </span>
            개
          </>
        )}
      </p>

      {/* 프로젝트 그리드 */}
      {filteredProjects.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          해당 기술 스택의 프로젝트가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

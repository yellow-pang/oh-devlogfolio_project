"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  GitFork,
  Users,
  Calendar,
  Trophy,
  CheckCircle2,
  Lightbulb,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { TagBadge } from "@/components/common/TagBadge";
import { getProjectById } from "@/lib/services/projects";
import { Project, ProjectType, ProjectStatus } from "@/types/project";

interface Props {
  id: string;
}

const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  personal: "개인 프로젝트",
  team: "팀 프로젝트",
  side: "사이드 프로젝트",
  hackathon: "해커톤",
};

const PROJECT_STATUS_LABEL: Record<
  ProjectStatus,
  { label: string; color: string }
> = {
  completed: {
    label: "완료",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  "in-progress": {
    label: "진행 중",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  paused: {
    label: "중단",
    color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function ProjectDetailClient({ id }: Props) {
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    getProjectById(id).then((found) => setProject(found ?? null));
  }, [id]);

  if (project === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-muted-foreground py-16">
          불러오는 중...
        </p>
      </div>
    );
  }

  if (project === null) {
    notFound();
  }

  const startFormatted = formatDate(project.startDate);
  const endFormatted = formatDate(project.endDate);
  const period =
    startFormatted && endFormatted
      ? `${startFormatted} ~ ${endFormatted}`
      : startFormatted
        ? `${startFormatted} ~`
        : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 뒤로가기 */}
      <Link
        href="/projects"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "mb-8 -ml-2",
        })}
      >
        <ArrowLeft className="size-4 mr-1.5" />
        프로젝트 목록
      </Link>

      {/* 헤더 섹션 */}
      <div className="mb-8">
        {/* 배지 행 */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.projectType && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {PROJECT_TYPE_LABEL[project.projectType]}
            </span>
          )}
          {project.status && (
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${PROJECT_STATUS_LABEL[project.status].color}`}
            >
              {PROJECT_STATUS_LABEL[project.status].label}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {project.description}
        </p>

        {/* 메타 정보 행 */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          {project.teamSize && (
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>팀원 {project.teamSize}명</span>
            </div>
          )}
          {period && (
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>{period}</span>
            </div>
          )}
          {project.role && (
            <div className="flex items-center gap-1.5">
              <Wrench className="size-4" />
              <span>{project.role}</span>
            </div>
          )}
          {project.contribution && (
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4" />
              <span>기여도 {project.contribution}</span>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <GitFork className="size-4 mr-2" />
              GitHub
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({})}
            >
              <ExternalLink className="size-4 mr-2" />
              Live Demo
            </Link>
          )}
        </div>
      </div>

      {/* 썸네일 */}
      {project.thumbnailUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted mb-10">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div className="space-y-10">
        {/* 기술 스택 */}
        {project.techStack && project.techStack.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 상세 설명 */}
        {project.longDescription && (
          <section>
            <h2 className="text-xl font-bold mb-4">프로젝트 소개</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </section>
        )}

        {/* 담당 업무 */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">담당 업무</h2>
            <ul className="space-y-2">
              {project.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 주요 기능 */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">주요 기능</h2>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="mt-0.5 size-5 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 기술적 도전과제 */}
        {project.challenges && project.challenges.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">
              기술적 도전과제 & 해결 방법
            </h2>
            <div className="space-y-4">
              {project.challenges.map((ch, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-4 space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="size-4 mt-0.5 shrink-0 text-yellow-500" />
                    <div>
                      <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
                        문제
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ch.problem}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
                    <div>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                        해결
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ch.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 성과 */}
        {project.achievements && project.achievements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">성과 및 결과</h2>
            <ul className="space-y-2">
              {project.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <Trophy className="size-4 mt-0.5 shrink-0 text-yellow-500" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 스크린샷 갤러리 */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">스크린샷</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={src}
                    alt={`${project.title} 스크린샷 ${i + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 태그 */}
        {project.tags && project.tags.length > 0 && (
          <section>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

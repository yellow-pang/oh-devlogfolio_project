"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitFork } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TagBadge } from "@/components/common/TagBadge";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // 이미지 로드 실패 시 placeholder 처리
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 gap-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "flex-1",
              })}
            >
              <GitFork className="size-3.5 mr-1.5" />
              GitHub
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "sm", className: "flex-1" })}
            >
              <ExternalLink className="size-3.5 mr-1.5" />
              Demo
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

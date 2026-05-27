"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-16">
        등록된 프로젝트가 없습니다.
      </p>
    );
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            프로젝트
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            직접 만든 프로젝트들을 소개합니다.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

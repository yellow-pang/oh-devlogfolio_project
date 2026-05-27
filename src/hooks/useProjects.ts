"use client";

import { useState, useEffect, useCallback } from "react";
import { Project, ProjectFormData } from "@/types/project";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/services/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      setError("프로젝트를 불러오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (data: ProjectFormData) => {
    const newProject = await createProject(data);
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const editProject = async (id: string, data: Partial<ProjectFormData>) => {
    const updated = await updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const removeProject = async (id: string) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    addProject,
    editProject,
    removeProject,
  };
}

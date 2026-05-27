/**
 * 프로젝트 데이터 서비스
 *
 * 현재는 Mock 데이터를 반환합니다.
 * 5단계(Firebase 연결)에서 Firestore 구현으로 교체하세요.
 *
 * 교체 방법:
 * - import { db } from "@/lib/firebase/config"
 * - collection(db, "projects"), getDocs, addDoc, updateDoc, deleteDoc 사용
 */

import { Project, ProjectFormData } from "@/types/project";
import { mockProjects } from "@/lib/mock/projects";

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  // TODO: Firestore 교체 시 → getDocs(collection(db, "projects"))
  return mockProjects.sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectById(id: string): Promise<Project | null> {
  // TODO: Firestore 교체 시 → getDoc(doc(db, "projects", id))
  return mockProjects.find((p) => p.id === id) ?? null;
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createProject(data: ProjectFormData): Promise<Project> {
  // TODO: Firestore 교체 시 → addDoc(collection(db, "projects"), { ...data, createdAt, updatedAt })
  const now = new Date().toISOString();
  const newProject: Project = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  mockProjects.push(newProject);
  return newProject;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateProject(
  id: string,
  data: Partial<ProjectFormData>,
): Promise<Project> {
  // TODO: Firestore 교체 시 → updateDoc(doc(db, "projects", id), { ...data, updatedAt })
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Project not found: ${id}`);

  const updated: Project = {
    ...mockProjects[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockProjects[index] = updated;
  return updated;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteProject(id: string): Promise<void> {
  // TODO: Firestore 교체 시 → deleteDoc(doc(db, "projects", id))
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index !== -1) mockProjects.splice(index, 1);
}

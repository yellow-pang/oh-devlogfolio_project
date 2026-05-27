"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Star,
  Plus,
  ExternalLink,
  GitFork,
  Search,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProjects } from "@/hooks/useProjects";
import { Project, ProjectFormData } from "@/types/project";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function AdminProjectsPage() {
  const { projects, loading, addProject, editProject, removeProject } =
    useProjects();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (data: ProjectFormData) => {
    if (editTarget) {
      await editProject(editTarget.id, data);
    } else {
      await addProject(data);
    }
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleEdit = (project: Project) => {
    setEditTarget(project);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  const executeDelete = async () => {
    if (deleteTargetId) {
      await removeProject(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        불러오는 중...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">프로젝트 관리</h1>
          <p className="text-muted-foreground mt-1">
            총 {projects.length}개의 프로젝트
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="제목 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 w-48 text-sm"
            />
          </div>
          <Button
            onClick={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
          >
            <Plus className="size-4 mr-1.5" />
            프로젝트 추가
          </Button>
        </div>
      </div>

      {/* Project Form (inline) */}
      {formOpen && (
        <Card className="mb-6 border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {editTarget ? "프로젝트 수정" : "새 프로젝트"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm
              defaultValues={editTarget ?? undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setFormOpen(false);
                setEditTarget(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Project List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          {searchQuery ? "검색 결과가 없습니다." : "등록된 프로젝트가 없습니다."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm truncate">
                    {project.title}
                  </span>
                  {project.featured && (
                    <Star className="size-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "icon",
                      className: "size-8",
                    })}
                  >
                    <GitFork className="size-3.5" />
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "icon",
                      className: "size-8",
                    })}
                  >
                    <ExternalLink className="size-3.5" />
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => handleEdit(project)}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>프로젝트를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제된 프로젝트는 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

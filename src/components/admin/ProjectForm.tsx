"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormData } from "@/types/project";

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormData> & { id?: string };
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      longDescription: defaultValues?.longDescription ?? "",
      thumbnailUrl:
        defaultValues?.thumbnailUrl ?? "/images/project-placeholder.png",
      tags: defaultValues?.tags ?? [],
      techStack: defaultValues?.techStack ?? [],
      githubUrl: defaultValues?.githubUrl ?? "",
      liveUrl: defaultValues?.liveUrl ?? "",
      featured: defaultValues?.featured ?? false,
      order: defaultValues?.order ?? 99,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">제목 *</Label>
          <Input
            id="title"
            {...register("title", { required: true })}
            placeholder="프로젝트 이름"
          />
        </div>

        {/* Thumbnail URL */}
        <div className="space-y-1.5">
          <Label htmlFor="thumbnailUrl">썸네일 URL</Label>
          <Input
            id="thumbnailUrl"
            {...register("thumbnailUrl")}
            placeholder="/images/project.png 또는 https://..."
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">짧은 설명 *</Label>
        <Input
          id="description"
          {...register("description", { required: true })}
          placeholder="한 줄 소개"
        />
      </div>

      {/* Long Description */}
      <div className="space-y-1.5">
        <Label htmlFor="longDescription">상세 설명</Label>
        <Textarea
          id="longDescription"
          {...register("longDescription")}
          placeholder="프로젝트 상세 내용"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tags */}
        <div className="space-y-1.5">
          <Label htmlFor="tags">태그 (쉼표 구분)</Label>
          <Input
            id="tags"
            {...register("tags", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((t: string) => t.trim())
                      .filter(Boolean)
                  : v,
            })}
            placeholder="React, TypeScript, Firebase"
            defaultValue={defaultValues?.tags?.join(", ")}
          />
        </div>

        {/* Tech Stack */}
        <div className="space-y-1.5">
          <Label htmlFor="techStack">기술 스택 (쉼표 구분)</Label>
          <Input
            id="techStack"
            {...register("techStack", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((t: string) => t.trim())
                      .filter(Boolean)
                  : v,
            })}
            placeholder="Next.js, Tailwind CSS"
            defaultValue={defaultValues?.techStack?.join(", ")}
          />
        </div>

        {/* GitHub URL */}
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            {...register("githubUrl")}
            placeholder="https://github.com/..."
          />
        </div>

        {/* Live URL */}
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            {...register("liveUrl")}
            placeholder="https://..."
          />
        </div>

        {/* Order */}
        <div className="space-y-1.5">
          <Label htmlFor="order">순서</Label>
          <Input
            id="order"
            type="number"
            {...register("order", { valueAsNumber: true })}
          />
        </div>

        {/* Featured */}
        <div className="space-y-1.5 flex flex-col justify-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("featured")}
              className="rounded"
            />
            <span className="text-sm font-medium">대표 프로젝트로 설정</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  );
}

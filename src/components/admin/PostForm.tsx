"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormData } from "@/types/post";

interface PostFormProps {
  defaultValues?: Partial<PostFormData> & { id?: string };
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
}

export function PostForm({ defaultValues, onSubmit, onCancel }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      excerpt: defaultValues?.excerpt ?? "",
      content: defaultValues?.content ?? "",
      thumbnailUrl:
        defaultValues?.thumbnailUrl ?? "/images/post-placeholder.png",
      tags: defaultValues?.tags ?? [],
      published: defaultValues?.published ?? false,
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
            placeholder="포스트 제목"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register("slug", { required: true })}
            placeholder="my-post-slug"
          />
        </div>
      </div>

      {/* Thumbnail URL */}
      <div className="space-y-1.5">
        <Label htmlFor="thumbnailUrl">썸네일 URL</Label>
        <Input
          id="thumbnailUrl"
          {...register("thumbnailUrl")}
          placeholder="/images/post.png 또는 https://..."
        />
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5">
        <Label htmlFor="excerpt">요약 *</Label>
        <Textarea
          id="excerpt"
          {...register("excerpt", { required: true })}
          placeholder="포스트 요약 (목록에서 표시됩니다)"
          rows={2}
        />
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <Label htmlFor="content">본문 (Markdown)</Label>
        <Textarea
          id="content"
          {...register("content")}
          placeholder="# 제목&#10;&#10;본문을 마크다운으로 작성하세요."
          rows={10}
          className="font-mono text-sm"
        />
      </div>

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
          placeholder="React, TypeScript"
          defaultValue={defaultValues?.tags?.join(", ")}
        />
      </div>

      {/* Published */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" {...register("published")} className="rounded" />
        <span className="text-sm font-medium">즉시 게시하기</span>
      </label>

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

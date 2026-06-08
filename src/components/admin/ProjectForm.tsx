"use client";

import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
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
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      longDescription: defaultValues?.longDescription ?? "",
      thumbnailUrl:
        defaultValues?.thumbnailUrl ?? "/images/common/project_placeholder.png",
      tags: defaultValues?.tags ?? [],
      techStack: defaultValues?.techStack ?? [],
      githubUrl: defaultValues?.githubUrl ?? "",
      liveUrl: defaultValues?.liveUrl ?? "",
      featured: defaultValues?.featured ?? false,
      order: defaultValues?.order ?? 99,
      // 신규 필드
      projectType: defaultValues?.projectType ?? undefined,
      teamSize: defaultValues?.teamSize ?? undefined,
      startDate: defaultValues?.startDate ?? "",
      endDate: defaultValues?.endDate ?? "",
      status: defaultValues?.status ?? undefined,
      role: defaultValues?.role ?? "",
      contribution: defaultValues?.contribution ?? "",
      responsibilities: defaultValues?.responsibilities ?? [],
      keyFeatures: defaultValues?.keyFeatures ?? [],
      challenges: defaultValues?.challenges ?? [],
      achievements: defaultValues?.achievements ?? [],
      screenshots: defaultValues?.screenshots ?? [],
    },
  });

  const thumbnailUrl = useWatch({ control, name: "thumbnailUrl" });
  const projectType = watch("projectType");
  const status = watch("status");

  const {
    fields: challengeFields,
    append: appendChallenge,
    remove: removeChallenge,
  } = useFieldArray({ control, name: "challenges" as never });

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
          {thumbnailUrl && (
            <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted mt-2">
              <Image
                src={thumbnailUrl}
                alt="썸네일 미리보기"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
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

      {/* ─── 프로젝트 기본 정보 ─────────────────────────────── */}
      <div className="pt-2 border-t">
        <p className="text-sm font-semibold text-muted-foreground mb-3">
          프로젝트 기본 정보
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 프로젝트 유형 */}
          <div className="space-y-1.5">
            <Label>프로젝트 유형</Label>
            <Select
              value={projectType ?? ""}
              onValueChange={(v) =>
                setValue("projectType", v as ProjectFormData["projectType"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">개인 프로젝트</SelectItem>
                <SelectItem value="team">팀 프로젝트</SelectItem>
                <SelectItem value="side">사이드 프로젝트</SelectItem>
                <SelectItem value="hackathon">해커톤</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 프로젝트 상태 */}
          <div className="space-y-1.5">
            <Label>프로젝트 상태</Label>
            <Select
              value={status ?? ""}
              onValueChange={(v) =>
                setValue("status", v as ProjectFormData["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">완료</SelectItem>
                <SelectItem value="in-progress">진행 중</SelectItem>
                <SelectItem value="paused">중단</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 팀 인원수 */}
          <div className="space-y-1.5">
            <Label htmlFor="teamSize">팀 인원수</Label>
            <Input
              id="teamSize"
              type="number"
              min={1}
              {...register("teamSize", { valueAsNumber: true })}
              placeholder="예: 3"
            />
          </div>

          {/* 시작일 */}
          <div className="space-y-1.5">
            <Label htmlFor="startDate">시작일</Label>
            <Input id="startDate" type="month" {...register("startDate")} />
          </div>

          {/* 종료일 */}
          <div className="space-y-1.5">
            <Label htmlFor="endDate">종료일</Label>
            <Input id="endDate" type="month" {...register("endDate")} />
          </div>
        </div>
      </div>

      {/* ─── 역할 및 기여 ────────────────────────────────────── */}
      <div className="pt-2 border-t">
        <p className="text-sm font-semibold text-muted-foreground mb-3">
          역할 및 기여
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 담당 역할 */}
          <div className="space-y-1.5">
            <Label htmlFor="role">담당 역할</Label>
            <Input
              id="role"
              {...register("role")}
              placeholder="예: 프론트엔드 개발, 팀장"
            />
          </div>

          {/* 기여도 */}
          <div className="space-y-1.5">
            <Label htmlFor="contribution">기여도</Label>
            <Input
              id="contribution"
              {...register("contribution")}
              placeholder="예: 70% 또는 UI 전체 구현"
            />
          </div>
        </div>

        {/* 담당 주요 업무 */}
        <div className="space-y-1.5 mt-4">
          <Label htmlFor="responsibilities">
            담당 주요 업무 (줄바꿈으로 구분)
          </Label>
          <Textarea
            id="responsibilities"
            {...register("responsibilities", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split("\n")
                      .map((s: string) => s.trim())
                      .filter(Boolean)
                  : v,
            })}
            placeholder={
              "로그인/회원가입 UI 구현\nFirestore 연동 및 데이터 관리\n반응형 레이아웃 설계"
            }
            rows={3}
            defaultValue={defaultValues?.responsibilities?.join("\n")}
          />
        </div>
      </div>

      {/* ─── 프로젝트 상세 내용 ─────────────────────────────── */}
      <div className="pt-2 border-t">
        <p className="text-sm font-semibold text-muted-foreground mb-3">
          프로젝트 상세 내용
        </p>

        {/* 주요 기능 */}
        <div className="space-y-1.5">
          <Label htmlFor="keyFeatures">주요 기능 (줄바꿈으로 구분)</Label>
          <Textarea
            id="keyFeatures"
            {...register("keyFeatures", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split("\n")
                      .map((s: string) => s.trim())
                      .filter(Boolean)
                  : v,
            })}
            placeholder={
              "Firebase Auth 기반 소셜 로그인\n실시간 Firestore 데이터 동기화\nAdmin 대시보드 CRUD"
            }
            rows={3}
            defaultValue={defaultValues?.keyFeatures?.join("\n")}
          />
        </div>

        {/* 기술적 도전과제 */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <Label>기술적 도전과제 & 해결 방법</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendChallenge({ problem: "", solution: "" } as never)
              }
            >
              <Plus className="size-3.5 mr-1" />
              항목 추가
            </Button>
          </div>
          {(challengeFields as { id: string }[]).length === 0 && (
            <p className="text-sm text-muted-foreground">
              항목 추가 버튼을 눌러 도전과제를 등록하세요.
            </p>
          )}
          <div className="space-y-3">
            {(challengeFields as { id: string }[]).map((field, idx) => (
              <div key={field.id} className="rounded-lg border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{idx + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChallenge(idx)}
                    className="size-7 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor={`challenges.${idx}.problem`}
                    className="text-xs"
                  >
                    문제
                  </Label>
                  <Input
                    id={`challenges.${idx}.problem`}
                    {...register(`challenges.${idx}.problem` as never)}
                    placeholder="예: 정적 빌드 후 최신 데이터가 반영되지 않음"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor={`challenges.${idx}.solution`}
                    className="text-xs"
                  >
                    해결 방법
                  </Label>
                  <Input
                    id={`challenges.${idx}.solution`}
                    {...register(`challenges.${idx}.solution` as never)}
                    placeholder="예: ISR/SSR 전략 도입으로 실시간 데이터 반영"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 성과 */}
        <div className="space-y-1.5 mt-4">
          <Label htmlFor="achievements">성과 및 결과 (줄바꿈으로 구분)</Label>
          <Textarea
            id="achievements"
            {...register("achievements", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split("\n")
                      .map((s: string) => s.trim())
                      .filter(Boolean)
                  : v,
            })}
            placeholder={"월간 방문자 500명 달성\n사내 우수 프로젝트 선정"}
            rows={2}
            defaultValue={defaultValues?.achievements?.join("\n")}
          />
        </div>

        {/* 스크린샷 URL */}
        <div className="space-y-1.5 mt-4">
          <Label htmlFor="screenshots">스크린샷 URL (줄바꿈으로 구분)</Label>
          <Textarea
            id="screenshots"
            {...register("screenshots", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split("\n")
                      .map((s: string) => s.trim())
                      .filter(Boolean)
                  : v,
            })}
            placeholder={"/images/screenshot1.png\nhttps://..."}
            rows={2}
            defaultValue={defaultValues?.screenshots?.join("\n")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
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

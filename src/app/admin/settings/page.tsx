"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteSettings, saveSiteSettings } from "@/lib/services/siteSettings";
import {
  SiteSettings,
  SkillGroup,
  defaultSiteSettings,
} from "@/types/siteSettings";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [skillRawInputs, setSkillRawInputs] = useState<string[]>(
    defaultSiteSettings.skills.map((g) => g.items.join(", ")),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings().then((data) => {
      setSettings(data);
      setSkillRawInputs(data.skills.map((g) => g.items.join(", ")));
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await saveSiteSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // ── Hero helpers ──────────────────────────────────────────────
  function setHero(field: keyof SiteSettings["hero"], value: string) {
    setSettings((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  }

  // ── Skills helpers ────────────────────────────────────────────
  function updateSkillCategory(index: number, value: string) {
    setSettings((prev) => {
      const skills = [...prev.skills];
      skills[index] = { ...skills[index], category: value };
      return { ...prev, skills };
    });
  }

  function updateSkillItemsRaw(index: number, value: string) {
    setSkillRawInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function parseSkillItems(index: number) {
    const raw = skillRawInputs[index] ?? "";
    setSettings((prev) => {
      const skills = [...prev.skills];
      skills[index] = {
        ...skills[index],
        items: raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      return { ...prev, skills };
    });
  }

  function addSkillGroup() {
    setSettings((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: "", items: [] }],
    }));
    setSkillRawInputs((prev) => [...prev, ""]);
  }

  function removeSkillGroup(index: number) {
    setSettings((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
    setSkillRawInputs((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Contact helpers ───────────────────────────────────────────
  function setContact(field: keyof SiteSettings["contact"], value: string) {
    setSettings((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">사이트 설정</h1>
          <p className="text-muted-foreground mt-1">
            메인 페이지에 표시될 내용을 수정합니다.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="size-4 mr-2" />
          {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
        </Button>
      </div>

      {/* ── Hero Section ────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hero 섹션</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>인삿말</Label>
            <Input
              value={settings.hero.greeting}
              onChange={(e) => setHero("greeting", e.target.value)}
              placeholder="Hello, World! 👋"
            />
          </div>
          <div className="space-y-1.5">
            <Label>이름</Label>
            <Input
              value={settings.hero.name}
              onChange={(e) => setHero("name", e.target.value)}
              placeholder="Oh"
            />
          </div>
          <div className="space-y-1.5">
            <Label>직함 (Title)</Label>
            <Input
              value={settings.hero.title}
              onChange={(e) => setHero("title", e.target.value)}
              placeholder="Frontend Developer"
            />
          </div>
          <div className="space-y-1.5">
            <Label>소개 (Bio)</Label>
            <Textarea
              value={settings.hero.bio}
              onChange={(e) => setHero("bio", e.target.value)}
              rows={3}
              placeholder="간단한 자기소개를 입력하세요."
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Skills Section ───────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">기술 스택</CardTitle>
          <Button variant="outline" size="sm" onClick={addSkillGroup}>
            <Plus className="size-3.5 mr-1" />
            그룹 추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.skills.map((group, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <GripVertical className="size-4 text-muted-foreground shrink-0" />
                <Input
                  value={group.category}
                  onChange={(e) => updateSkillCategory(index, e.target.value)}
                  placeholder="카테고리 이름 (예: Frontend)"
                  className="font-medium"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive shrink-0"
                  onClick={() => removeSkillGroup(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  기술 목록 (쉼표로 구분)
                </Label>
                <Input
                  value={skillRawInputs[index] ?? ""}
                  onChange={(e) => updateSkillItemsRaw(index, e.target.value)}
                  onBlur={() => parseSkillItems(index)}
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
            </div>
          ))}
          {settings.skills.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              기술 그룹을 추가해 주세요.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Contact Section ──────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">연락처 링크</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>이메일</Label>
            <Input
              value={settings.contact.email}
              onChange={(e) => setContact("email", e.target.value)}
              placeholder="contact@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label>GitHub URL</Label>
            <Input
              value={settings.contact.github}
              onChange={(e) => setContact("github", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
          <div className="space-y-1.5">
            <Label>LinkedIn URL</Label>
            <Input
              value={settings.contact.linkedin}
              onChange={(e) => setContact("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bottom Save */}
      <div className="flex justify-end pb-8">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="size-4 mr-2" />
          {saving ? "저장 중..." : saved ? "저장됨 ✓" : "변경사항 저장"}
        </Button>
      </div>
    </div>
  );
}

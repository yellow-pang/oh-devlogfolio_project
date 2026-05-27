"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category";

export default function AdminCategoriesPage() {
  const { categories, loading, addCategory, editCategory, removeCategory } =
    useCategories();

  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const handleAdd = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setAdding(true);
    try {
      await addCategory({ name: trimmed });
      setNewName("");
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (category: Category) => {
    setEditTargetId(category.id);
    setEditName(category.name);
  };

  const cancelEdit = () => {
    setEditTargetId(null);
    setEditName("");
  };

  const confirmEdit = async (id: string) => {
    const trimmed = editName.trim();
    if (!trimmed) return;
    await editCategory(id, { name: trimmed });
    cancelEdit();
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;
    await removeCategory(deleteTarget.id);
    setDeleteTarget(null);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">카테고리 관리</h1>
        <p className="text-muted-foreground mt-1">
          총 {categories.length}개의 카테고리
        </p>
      </div>

      {/* 카테고리 추가 */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">새 카테고리 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="카테고리 이름 (예: 개발일지, 알고리즘, 회고)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1"
            />
            <Button onClick={handleAdd} disabled={adding || !newName.trim()}>
              <Plus className="size-4 mr-1.5" />
              추가
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 카테고리 목록 */}
      {categories.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          등록된 카테고리가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Card key={category.id} className="p-4">
              {editTargetId === category.id ? (
                /* 인라인 편집 모드 */
                <div className="flex items-center gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") confirmEdit(category.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    className="flex-1 h-8 text-sm"
                    autoFocus
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 text-green-600 hover:text-green-700"
                    onClick={() => confirmEdit(category.id)}
                    disabled={!editName.trim()}
                  >
                    <Check className="size-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8"
                    onClick={cancelEdit}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              ) : (
                /* 일반 표시 모드 */
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{category.name}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => startEdit(category)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(category)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>카테고리를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{deleteTarget?.name}&rdquo; 카테고리를 삭제합니다.
              <br />
              해당 카테고리로 분류된 포스트에는 영향을 주지 않습니다.
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

"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Eye, EyeOff, Search } from "lucide-react";
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
import { usePosts } from "@/hooks/usePosts";
import { Post, PostFormData } from "@/types/post";
import { PostForm } from "@/components/admin/PostForm";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function AdminPostsPage() {
  const { posts, loading, addPost, editPost, removePost } = usePosts();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Post | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (data: PostFormData) => {
    if (editTarget) {
      await editPost(editTarget.id, data);
    } else {
      await addPost(data);
    }
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleEdit = (post: Post) => {
    setEditTarget(post);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  const executeDelete = async () => {
    if (deleteTargetId) {
      await removePost(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const togglePublish = async (post: Post) => {
    await editPost(post.id, { published: !post.published });
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
          <h1 className="text-2xl font-bold tracking-tight">포스트 관리</h1>
          <p className="text-muted-foreground mt-1">
            총 {posts.length}개 · 게시됨{" "}
            {posts.filter((p) => p.published).length}개
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
            포스트 작성
          </Button>
        </div>
      </div>

      {/* Post Form (inline) */}
      {formOpen && (
        <Card className="mb-6 border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {editTarget ? "포스트 수정" : "새 포스트"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm
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

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          {searchQuery ? "검색 결과가 없습니다." : "작성된 포스트가 없습니다."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm truncate">
                    {post.title}
                  </span>
                  <Badge
                    variant={post.published ? "default" : "outline"}
                    className="text-xs shrink-0"
                  >
                    {post.published ? "게시됨" : "비공개"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  slug: {post.slug}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(post.createdAt), "PPP", { locale: ko })}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => togglePublish(post)}
                  title={post.published ? "비공개로 전환" : "게시하기"}
                >
                  {post.published ? (
                    <Eye className="size-3.5" />
                  ) : (
                    <EyeOff className="size-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => handleEdit(post)}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(post.id)}
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
            <AlertDialogTitle>포스트를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제된 포스트는 복구할 수 없습니다.
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

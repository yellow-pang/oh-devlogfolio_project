/**
 * 포스트 데이터 서비스
 *
 * 현재는 Mock 데이터를 반환합니다.
 * 5단계(Firebase 연결)에서 Firestore 구현으로 교체하세요.
 *
 * 교체 방법:
 * - import { db } from "@/lib/firebase/config"
 * - collection(db, "posts"), getDocs, addDoc, updateDoc, deleteDoc 사용
 */

import { Post, PostFormData } from "@/types/post";
import { mockPosts } from "@/lib/mock/posts";

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  // TODO: Firestore 교체 시 → getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")))
  return [...mockPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.published);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // TODO: Firestore 교체 시 → getDocs(query(collection(db, "posts"), where("slug", "==", slug)))
  return mockPosts.find((p) => p.slug === slug) ?? null;
}

export async function getPostById(id: string): Promise<Post | null> {
  // TODO: Firestore 교체 시 → getDoc(doc(db, "posts", id))
  return mockPosts.find((p) => p.id === id) ?? null;
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createPost(data: PostFormData): Promise<Post> {
  // TODO: Firestore 교체 시 → addDoc(collection(db, "posts"), { ...data, createdAt, updatedAt })
  const now = new Date().toISOString();
  const newPost: Post = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  mockPosts.push(newPost);
  return newPost;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updatePost(
  id: string,
  data: Partial<PostFormData>,
): Promise<Post> {
  // TODO: Firestore 교체 시 → updateDoc(doc(db, "posts", id), { ...data, updatedAt })
  const index = mockPosts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Post not found: ${id}`);

  const updated: Post = {
    ...mockPosts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  mockPosts[index] = updated;
  return updated;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deletePost(id: string): Promise<void> {
  // TODO: Firestore 교체 시 → deleteDoc(doc(db, "posts", id))
  const index = mockPosts.findIndex((p) => p.id === id);
  if (index !== -1) mockPosts.splice(index, 1);
}

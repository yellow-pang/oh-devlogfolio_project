/**
 * 카테고리 데이터 서비스
 *
 * 현재는 Mock 데이터를 반환합니다.
 * Firebase 연결 시 Firestore 구현으로 교체하세요.
 *
 * 교체 방법:
 * - import { db } from "@/lib/firebase/config"
 * - collection(db, "categories"), getDocs, addDoc, deleteDoc 사용
 */

import { Category, CategoryFormData } from "@/types/category";
import { mockCategories } from "@/lib/mock/categories";

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  // TODO: Firestore 교체 시 → getDocs(query(collection(db, "categories"), orderBy("createdAt")))
  return [...mockCategories].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createCategory(
  data: CategoryFormData,
): Promise<Category> {
  // TODO: Firestore 교체 시 → addDoc(collection(db, "categories"), { ...data, createdAt })
  const now = new Date().toISOString();
  const newCategory: Category = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
  };
  mockCategories.push(newCategory);
  return newCategory;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteCategory(id: string): Promise<void> {
  // TODO: Firestore 교체 시 → deleteDoc(doc(db, "categories", id))
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index !== -1) mockCategories.splice(index, 1);
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateCategory(
  id: string,
  data: CategoryFormData,
): Promise<Category> {
  // TODO: Firestore 교체 시 → updateDoc(doc(db, "categories", id), data)
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) throw new Error(`Category not found: ${id}`);
  mockCategories[index] = { ...mockCategories[index], ...data };
  return mockCategories[index];
}

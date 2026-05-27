"use client";

import { useState, useEffect, useCallback } from "react";
import { Category, CategoryFormData } from "@/types/category";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/services/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("카테고리를 불러오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (data: CategoryFormData) => {
    const newCategory = await createCategory(data);
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const editCategory = async (id: string, data: CategoryFormData) => {
    const updated = await updateCategory(id, data);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const removeCategory = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  };
}

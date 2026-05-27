"use client";

import { useState, useEffect, useCallback } from "react";
import { Post, PostFormData } from "@/types/post";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "@/lib/services/posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      setError("포스트를 불러오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = async (data: PostFormData) => {
    const newPost = await createPost(data);
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const editPost = async (id: string, data: Partial<PostFormData>) => {
    const updated = await updatePost(id, data);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const removePost = async (id: string) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    addPost,
    editPost,
    removePost,
  };
}

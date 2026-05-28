"use client";

import { useEffect, useState } from "react";
import { getPublishedPosts } from "@/lib/services/posts";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { PageHeader } from "@/components/common/PageHeader";
import { Post } from "@/types/post";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader title="블로그" description="개발 학습과 경험을 기록합니다." />

      {loading ? (
        <p className="text-center text-muted-foreground py-16">불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          아직 작성된 포스트가 없습니다.
        </p>
      ) : (
        <BlogFilter posts={posts} />
      )}
    </div>
  );
}

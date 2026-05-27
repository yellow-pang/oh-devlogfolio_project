"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TagBadge } from "@/components/common/TagBadge";
import { PostCard } from "@/components/blog/PostCard";
import { Post } from "@/types/post";

interface BlogFilterProps {
  posts: Post[];
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  const hasActiveFilter = searchQuery.trim() !== "" || selectedTag !== null;

  return (
    <div className="space-y-6">
      {/* 검색 입력 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="포스트 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="검색어 초기화"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* 태그 필터 */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground mr-1">태그:</span>
          {allTags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              onClick={() => handleTagClick(tag)}
              className={
                selectedTag === tag
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }
            />
          ))}
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1 transition-colors"
            >
              초기화
            </button>
          )}
        </div>
      )}

      {/* 결과 수 */}
      {hasActiveFilter && (
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length}개의 포스트
        </p>
      )}

      {/* 포스트 목록 */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          검색 결과가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

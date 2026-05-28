"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { buttonVariants } from "@/components/ui/button";
import { TagBadge } from "@/components/common/TagBadge";
import { getPostBySlug, getPublishedPosts } from "@/lib/services/posts";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { Post } from "@/types/post";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      const [found, allPosts] = await Promise.all([
        getPostBySlug(slug),
        getPublishedPosts(),
      ]);

      if (!found || !found.published) {
        setPost(null);
        return;
      }

      const sorted = allPosts.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      const idx = sorted.findIndex((p) => p.slug === slug);
      setPrevPost(idx > 0 ? sorted[idx - 1] : null);
      setNextPost(idx < sorted.length - 1 ? sorted[idx + 1] : null);
      setPost(found);
    }

    load();
  }, [slug]);

  // 로딩 중
  if (post === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-muted-foreground">불러오는 중...</p>
      </div>
    );
  }

  // 포스트 없음
  if (post === null) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/blog"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "mb-8 -ml-2",
        })}
      >
        <ArrowLeft className="size-4 mr-1.5" />
        블로그 목록
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-3.5" />
          <time dateTime={post.createdAt}>
            {format(new Date(post.createdAt), "PPP", { locale: ko })}
          </time>
        </div>
      </header>

      {/* Thumbnail */}
      {post.thumbnailUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted mb-10">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-img:rounded-xl prose-a:no-underline">
        <MarkdownContent content={post.content} />
      </div>

      {/* 이전/다음 글 네비게이션 */}
      {(prevPost || nextPost) && (
        <nav className="mt-16 pt-8 border-t grid grid-cols-2 gap-4">
          <div>
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col gap-1 text-sm"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronLeft className="size-3.5" />
                  이전 글
                </span>
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col gap-1 text-sm items-end"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  다음 글
                  <ChevronRight className="size-3.5" />
                </span>
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}

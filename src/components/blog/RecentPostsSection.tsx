import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PostCard } from "@/components/blog/PostCard";
import { Post } from "@/types/post";

interface RecentPostsSectionProps {
  posts: Post[];
}

export function RecentPostsSection({ posts }: RecentPostsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">최근 블로그 글</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            학습 과정과 개발 경험을 기록합니다.
          </p>
        </div>
        <Link
          href="/blog"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          전체 보기
          <ArrowRight className="size-4 ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

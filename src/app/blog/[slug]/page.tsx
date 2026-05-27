import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { buttonVariants } from "@/components/ui/button";
import { TagBadge } from "@/components/common/TagBadge";
import { getPostBySlug, getPublishedPosts } from "@/lib/services/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) notFound();

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
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-pre:bg-muted prose-pre:text-foreground prose-code:text-primary">
        {/* TODO: 마크다운 렌더링 (2단계에서 react-markdown 추가 예정) */}
        <div className="whitespace-pre-wrap font-mono text-sm bg-muted rounded-lg p-4">
          {post.content}
        </div>
      </div>
    </article>
  );
}

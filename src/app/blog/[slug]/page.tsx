import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { buttonVariants } from "@/components/ui/button";
import { TagBadge } from "@/components/common/TagBadge";
import { getPostBySlug, getPublishedPosts } from "@/lib/services/posts";
import { MarkdownContent } from "@/components/blog/MarkdownContent";

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

  const allPosts = await getPublishedPosts();
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

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

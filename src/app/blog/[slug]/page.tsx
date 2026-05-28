import { getPublishedPosts } from "@/lib/services/posts";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("[generateStaticParams] Firestore 호출 실패:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
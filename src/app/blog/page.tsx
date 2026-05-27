import { getPublishedPosts } from "@/lib/services/posts";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { PageHeader } from "@/components/common/PageHeader";

export const metadata = {
  title: "블로그",
  description: "개발 학습과 경험을 기록하는 블로그입니다.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader title="블로그" description="개발 학습과 경험을 기록합니다." />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          아직 작성된 포스트가 없습니다.
        </p>
      ) : (
        <BlogFilter posts={posts} />
      )}
    </div>
  );
}

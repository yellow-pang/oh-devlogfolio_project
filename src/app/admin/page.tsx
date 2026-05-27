import Link from "next/link";
import { FolderKanban, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getAllProjects } from "@/lib/services/projects";
import { getAllPosts } from "@/lib/services/posts";

export default async function AdminDashboard() {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getAllPosts(),
  ]);

  const stats = [
    {
      title: "전체 프로젝트",
      value: projects.length,
      featured: projects.filter((p) => p.featured).length,
      label: "대표 프로젝트",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      title: "전체 포스트",
      value: posts.length,
      featured: posts.filter((p) => p.published).length,
      label: "게시됨",
      href: "/admin/posts",
      icon: FileText,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground mt-1">콘텐츠를 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.featured} {stat.label}
                </p>
                <Link
                  href={stat.href}
                  className={buttonVariants({
                    variant: "link",
                    className: "px-0 mt-2 h-auto text-xs",
                  })}
                >
                  관리하기 <ArrowRight className="size-3 ml-1" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 gap-2">
            <FolderKanban className="size-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">새 프로젝트 추가</p>
            <Link
              href="/admin/projects"
              className={buttonVariants({ size: "sm", className: "mt-2" })}
            >
              프로젝트 관리
            </Link>
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 gap-2">
            <FileText className="size-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">새 포스트 작성</p>
            <Link
              href="/admin/posts"
              className={buttonVariants({ size: "sm", className: "mt-2" })}
            >
              포스트 관리
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

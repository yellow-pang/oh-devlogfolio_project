import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Tag,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  {
    label: "대시보드",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "프로젝트",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "블로그 포스트",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    label: "카테고리",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    label: "사이트 설정",
    href: "/admin/settings",
    icon: Settings,
  },
];

export { adminNav };

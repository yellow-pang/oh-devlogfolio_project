"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNav } from "./adminNav";
import { Code2 } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-muted/30 shrink-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-5 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          <Code2 className="size-4 text-primary" />
          <span>관리자 패널</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to site */}
      <div className="px-3 py-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          ← 사이트로 돌아가기
        </Link>
      </div>
    </aside>
  );
}

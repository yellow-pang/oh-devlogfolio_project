import Link from "next/link";
import { GitFork, Link2, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.author}. Built with Next.js & Firebase.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GitFork className="size-4" />
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Link2 className="size-4" />
            </Link>
            <Link
              href={siteConfig.links.email}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="이메일"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

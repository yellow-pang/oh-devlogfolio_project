"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TagBadge } from "@/components/common/TagBadge";
import { Post } from "@/types/post";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="group h-full flex flex-col overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          {/* Thumbnail */}
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
              <Calendar className="size-3" />
              <time dateTime={post.createdAt}>
                {format(new Date(post.createdAt), "PPP", { locale: ko })}
              </time>
            </div>
            <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </CardHeader>

          <CardContent className="flex-1 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

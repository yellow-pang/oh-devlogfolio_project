"use client";

import { motion } from "framer-motion";
import { ArrowDown, GitFork, Link2, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-sm font-medium text-primary mb-4 tracking-widest uppercase"
        >
          Hello, World! 👋
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          저는{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {siteConfig.author}
          </span>
          입니다
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-4"
        >
          {siteConfig.authorTitle}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {siteConfig.authorBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <Link
            href="/#projects"
            className={buttonVariants({
              size: "lg",
              className: "rounded-full px-8",
            })}
          >
            프로젝트 보기
          </Link>
          <Link
            href="/blog"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-full px-8",
            })}
          >
            블로그 보기
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitFork className="size-5" />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link2 className="size-5" />
          </Link>
          <Link
            href={siteConfig.links.email}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="size-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

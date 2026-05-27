"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, GitFork, Link2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-2">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            연락하기
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            새로운 기회나 협업에 관심이 있으시다면 언제든지 연락 주세요.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={siteConfig.links.email}
              className={buttonVariants({
                size: "lg",
                className: "rounded-full px-8",
              })}
            >
              <Mail className="size-4 mr-2" />
              이메일 보내기
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full px-8",
              })}
            >
              <GitFork className="size-4 mr-2" />
              GitHub
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full px-8",
              })}
            >
              <Link2 className="size-4 mr-2" />
              LinkedIn
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

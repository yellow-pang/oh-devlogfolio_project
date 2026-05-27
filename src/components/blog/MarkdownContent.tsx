"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface Props {
  content: string;
}

export function MarkdownContent({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeHighlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ]}
      components={{
        // 코드 블록 — 언어 클래스 그대로 전달
        pre({ children, ...props }) {
          return (
            <pre
              {...props}
              className="overflow-x-auto rounded-lg bg-muted p-4 text-sm"
            >
              {children}
            </pre>
          );
        },
        // 인라인 코드
        code({ children, className, ...props }) {
          const isBlock = className?.startsWith("language-");
          if (isBlock) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
          return (
            <code
              className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-primary"
              {...props}
            >
              {children}
            </code>
          );
        },
        // 링크 — 외부 링크는 새 탭
        a({ href, children, ...props }) {
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
              {...props}
            >
              {children}
            </a>
          );
        },
        // 인용구
        blockquote({ children, ...props }) {
          return (
            <blockquote
              className="border-l-4 border-primary/40 pl-4 text-muted-foreground italic"
              {...props}
            >
              {children}
            </blockquote>
          );
        },
        // 구분선
        hr(props) {
          return <hr className="my-8 border-border" {...props} />;
        },
        // 표
        table({ children, ...props }) {
          return (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" {...props}>
                {children}
              </table>
            </div>
          );
        },
        th({ children, ...props }) {
          return (
            <th
              className="border border-border px-4 py-2 bg-muted font-semibold text-left"
              {...props}
            >
              {children}
            </th>
          );
        },
        td({ children, ...props }) {
          return (
            <td className="border border-border px-4 py-2" {...props}>
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export const siteConfig = {
  name: "ohdevlogfolio",
  title: "oh.dev | 포트폴리오 & 개발 블로그",
  description: "프론트엔드 개발자의 포트폴리오 겸 학습 블로그입니다.",
  author: "Oh",
  authorTitle: "Frontend Developer",
  authorBio:
    "React · Next.js · TypeScript 를 좋아하는 프론트엔드 개발자입니다. 꾸준히 배우고 기록합니다.",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:contact@example.com",
  },
  nav: [
    { label: "홈", href: "/" },
    { label: "프로젝트", href: "/projects" },
    { label: "블로그", href: "/blog" },
  ],
} as const;

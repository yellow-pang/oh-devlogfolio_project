import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "ohdevlogfolio",
    description:
      "Firebase Hosting 기반의 개발자 포트폴리오 겸 학습 블로그. Next.js App Router + Firestore로 구현했습니다.",
    longDescription:
      "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui를 사용해 개발한 개인 포트폴리오 겸 블로그 프로젝트입니다. Firebase Hosting에 배포하고 Firestore로 데이터를 관리합니다. 관리자 대시보드에서 프로젝트와 블로그 포스트를 직접 CRUD할 수 있습니다.",
    thumbnailUrl: "/images/project-placeholder.png",
    tags: ["포트폴리오", "블로그", "Firebase"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "shadcn/ui",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 1,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "React 컴포넌트 라이브러리",
    description:
      "재사용 가능한 React 컴포넌트 라이브러리. Storybook으로 문서화하고 npm에 배포했습니다.",
    longDescription:
      "TypeScript 기반의 React 컴포넌트 라이브러리입니다. Button, Input, Modal 등 기본 UI 컴포넌트를 구현했습니다. Storybook을 통해 컴포넌트를 시각적으로 테스트하고 문서화했습니다.",
    thumbnailUrl: "/images/project-placeholder.png",
    tags: ["React", "TypeScript", "npm"],
    techStack: ["React", "TypeScript", "Storybook", "Rollup"],
    githubUrl: "https://github.com",
    featured: true,
    order: 2,
    createdAt: "2023-11-10T00:00:00.000Z",
    updatedAt: "2023-11-10T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Todo 앱 with Zustand",
    description:
      "Zustand 상태 관리를 연습하기 위해 만든 Todo 앱. 필터링, 우선순위, 로컬 스토리지 저장 기능 포함.",
    thumbnailUrl: "/images/project-placeholder.png",
    tags: ["React", "Zustand", "사이드프로젝트"],
    techStack: ["React", "TypeScript", "Zustand", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    order: 3,
    createdAt: "2023-08-20T00:00:00.000Z",
    updatedAt: "2023-08-20T00:00:00.000Z",
  },
  {
    id: "4",
    title: "날씨 대시보드",
    description:
      "OpenWeatherMap API를 활용한 실시간 날씨 대시보드. 도시 검색 및 7일 예보 기능.",
    thumbnailUrl: "/images/project-placeholder.png",
    tags: ["API", "대시보드", "React"],
    techStack: ["React", "TypeScript", "Recharts", "OpenWeatherMap API"],
    githubUrl: "https://github.com",
    featured: false,
    order: 4,
    createdAt: "2023-06-05T00:00:00.000Z",
    updatedAt: "2023-06-05T00:00:00.000Z",
  },
];

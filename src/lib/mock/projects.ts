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
    // 기본 정보
    projectType: "personal",
    status: "in-progress",
    startDate: "2024-01",
    // 역할 및 기여
    role: "풀스택 개발",
    contribution: "100%",
    responsibilities: [
      "Next.js App Router 기반 전체 구조 설계",
      "Firebase Firestore 연동 및 CRUD 구현",
      "어드민 대시보드 개발",
      "반응형 UI 구현",
    ],
    // 상세 내용
    keyFeatures: [
      "블로그 포스트 작성 및 마크다운 렌더링",
      "프로젝트 포트폴리오 관리",
      "관리자 대시보드 (CRUD)",
      "다크 모드 지원",
    ],
    challenges: [
      {
        problem: "정적 빌드 후 Firestore 최신 데이터가 반영되지 않음",
        solution:
          "클라이언트 사이드 Fetching 방식으로 전환하여 실시간 데이터 반영",
      },
    ],
    achievements: [
      "포트폴리오 & 블로그 통합 서비스 완성",
      "Firebase Hosting 배포 및 운영 중",
    ],
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
    projectType: "side",
    status: "completed",
    startDate: "2023-09",
    endDate: "2023-11",
    role: "단독 개발",
    contribution: "100%",
    responsibilities: [
      "컴포넌트 설계 및 구현",
      "Storybook 문서화",
      "npm 패키지 배포 및 버전 관리",
    ],
    keyFeatures: [
      "Button, Input, Modal 등 기본 컴포넌트 제공",
      "Storybook 기반 인터랙티브 문서",
      "TypeScript 타입 정의 포함",
    ],
    challenges: [
      {
        problem: "Rollup 번들링 시 peer dependency 충돌 문제",
        solution: "externals 설정으로 React를 번들에서 제외하여 해결",
      },
    ],
    achievements: ["npm 주간 다운로드 200+", "GitHub Star 12"],
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
    projectType: "personal",
    status: "completed",
    startDate: "2023-08",
    endDate: "2023-08",
    role: "단독 개발",
    contribution: "100%",
    responsibilities: ["Zustand 스토어 설계", "필터링 및 정렬 로직 구현"],
    keyFeatures: [
      "할 일 추가/삭제/완료 처리",
      "우선순위 설정",
      "필터링 (전체 / 미완료 / 완료)",
      "로컬 스토리지 자동 저장",
    ],
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
    projectType: "personal",
    status: "completed",
    startDate: "2023-06",
    endDate: "2023-06",
    role: "단독 개발",
    contribution: "100%",
    keyFeatures: [
      "도시 이름 검색",
      "현재 날씨 및 7일 예보",
      "Recharts 기반 온도 그래프",
    ],
    createdAt: "2023-06-05T00:00:00.000Z",
    updatedAt: "2023-06-05T00:00:00.000Z",
  },
];

import { Post } from "@/types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Next.js App Router 완전 정복",
    slug: "nextjs-app-router-guide",
    excerpt:
      "Next.js 13부터 도입된 App Router의 핵심 개념과 Pages Router와의 차이점을 정리했습니다.",
    content: `# Next.js App Router 완전 정복

Next.js 13에서 도입된 App Router는 React Server Components를 기반으로 한 새로운 라우팅 시스템입니다.

## 주요 개념

### 1. Server Components vs Client Components

App Router에서는 기본적으로 모든 컴포넌트가 **Server Component**입니다.
\`'use client'\` 지시어를 추가해야만 Client Component가 됩니다.

\`\`\`tsx
// Server Component (기본)
async function ServerComponent() {
  const data = await fetch('...');
  return <div>{data}</div>;
}

// Client Component
'use client';
function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

### 2. 라우팅 구조

\`app\` 폴더 내의 \`page.tsx\` 파일이 라우트를 생성합니다.

\`\`\`
app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
└── blog/
    ├── page.tsx      → /blog
    └── [slug]/
        └── page.tsx  → /blog/:slug
\`\`\`

## 마치며

App Router는 처음엔 낯설지만, 익숙해지면 강력한 데이터 페칭과 레이아웃 관리가 가능합니다.`,
    thumbnailUrl: "/images/post-placeholder.png",
    tags: ["Next.js", "React", "App Router"],
    published: true,
    createdAt: "2024-01-20T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
  },
  {
    id: "2",
    title: "TypeScript 제네릭 실전 가이드",
    slug: "typescript-generics-guide",
    excerpt:
      "TypeScript 제네릭의 기본 문법부터 조건부 타입, infer 키워드까지 실전 예제와 함께 정리합니다.",
    content: `# TypeScript 제네릭 실전 가이드

제네릭은 타입을 파라미터처럼 사용하는 TypeScript의 핵심 기능입니다.

## 기본 문법

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>("hello"); // string
const num = identity<number>(42);       // number
\`\`\`

## 제네릭 제약 조건

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 조건부 타입

\`\`\`typescript
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"
\`\`\``,
    thumbnailUrl: "/images/post-placeholder.png",
    tags: ["TypeScript", "제네릭", "타입스크립트"],
    published: true,
    createdAt: "2024-01-10T00:00:00.000Z",
    updatedAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Tailwind CSS v4 마이그레이션 노트",
    slug: "tailwind-css-v4-migration",
    excerpt:
      "Tailwind CSS v3에서 v4로 마이그레이션하면서 겪은 변경 사항과 주의할 점을 정리했습니다.",
    content: `# Tailwind CSS v4 마이그레이션 노트

Tailwind CSS v4는 완전히 새로운 엔진을 기반으로 하며, 설정 방식이 크게 바뀌었습니다.

## 주요 변경 사항

### 설정 파일 변경

v3에서는 \`tailwind.config.js\`를 사용했지만, v4에서는 CSS 파일에서 직접 설정합니다.

\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
\`\`\`

### 다크 모드

v4에서는 \`@custom-variant\`를 사용합니다.

\`\`\`css
@custom-variant dark (&:is(.dark *));
\`\`\``,
    thumbnailUrl: "/images/post-placeholder.png",
    tags: ["Tailwind CSS", "CSS", "마이그레이션"],
    published: true,
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-05T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Firebase Firestore 실전 CRUD",
    slug: "firebase-firestore-crud",
    excerpt:
      "Firebase Firestore client SDK를 사용해 데이터를 읽고 쓰는 방법을 Next.js 프로젝트에서 실전으로 살펴봅니다.",
    content: `# Firebase Firestore 실전 CRUD

Firestore는 NoSQL 문서 기반 데이터베이스입니다.

## 초기화

\`\`\`typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
\`\`\`

## 데이터 읽기

\`\`\`typescript
import { collection, getDocs } from 'firebase/firestore';

const querySnapshot = await getDocs(collection(db, 'posts'));
const posts = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
\`\`\``,
    thumbnailUrl: "/images/post-placeholder.png",
    tags: ["Firebase", "Firestore", "NoSQL"],
    published: false,
    createdAt: "2023-12-28T00:00:00.000Z",
    updatedAt: "2023-12-28T00:00:00.000Z",
  },
];

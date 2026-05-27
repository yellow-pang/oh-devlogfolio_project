# 1단계 — 프로젝트 초기 설정

**상태: ✅ 완료**

---

## 완료된 작업

### 패키지 설치

```bash
npx create-next-app@latest ohdevlogfolio --ts --app --src-dir --tailwind --import-alias "@/*"
npm install framer-motion next-themes lucide-react firebase date-fns clsx tailwind-merge class-variance-authority react-hook-form
npx shadcn@latest init
npx shadcn@latest add button badge card input label textarea select separator sheet dropdown-menu
```

### 생성된 파일

| 파일                           | 내용                                            |
| ------------------------------ | ----------------------------------------------- |
| `src/types/project.ts`         | `Project`, `ProjectFormData` 인터페이스         |
| `src/types/post.ts`            | `Post`, `PostFormData` 인터페이스               |
| `src/config/site.ts`           | `siteConfig` (이름, 소개, 링크, 네비게이션)     |
| `src/lib/mock/projects.ts`     | 프로젝트 목 데이터 4개                          |
| `src/lib/mock/posts.ts`        | 블로그 포스트 목 데이터 4개 (1개 비공개)        |
| `src/lib/firebase/config.ts`   | Firebase 초기화 + `db` export (플레이스홀더)    |
| `src/lib/services/projects.ts` | 프로젝트 CRUD 서비스 (mock 기반)                |
| `src/lib/services/posts.ts`    | 포스트 CRUD 서비스 (mock 기반)                  |
| `src/hooks/useProjects.ts`     | React 훅 — `projects`, `loading`, `error`, CRUD |
| `src/hooks/usePosts.ts`        | React 훅 — `posts`, `loading`, `error`, CRUD    |

### 주요 설계 원칙

- **서비스 계층 분리**: `src/lib/services/` 에 `// TODO: Firestore 교체 시` 주석 포함
- **훅 계층 분리**: `src/hooks/` 에서 서비스를 래핑하여 React 상태로 관리
- **데이터는 서비스를 통해서만**: 컴포넌트는 mock/Firestore를 직접 참조하지 않음

### Tailwind CSS v4 주의사항

```css
/* globals.css — tailwind.config.js 없음, CSS 기반 설정 사용 */
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));
@theme inline { ... }
```

---

## 다음 단계

→ [02-layout.md](./02-layout.md)

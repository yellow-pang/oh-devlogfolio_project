# 5단계 — Projects 전용 페이지

**상태: ✅ 완료**

---

## 구현된 내용

### 생성된 파일

| 파일                                         | 내용                                 |
| -------------------------------------------- | ------------------------------------ |
| `src/app/projects/page.tsx`                  | 프로젝트 목록 페이지 (서버 컴포넌트) |
| `src/components/portfolio/ProjectFilter.tsx` | 기술스택 필터 UI (Client Component)  |

### URL 구조

```
/projects   → 전체 프로젝트 목록 + 기술스택 필터
```

### `src/config/site.ts` 수정 완료

```ts
// 이전
nav: [{ label: "프로젝트", href: "/#projects" }];

// 현재
nav: [{ label: "프로젝트", href: "/projects" }];
```

### 페이지 요소

```
/projects
├── 페이지 헤더 ("프로젝트")
├── 기술스택 필터 버튼 (All / React / Next.js / TypeScript / ...)
├── 결과 수 + 선택 필터 라벨 ("React 프로젝트 N개")
├── 프로젝트 카드 그리드 (반응형)
└── 빈 상태 (empty state)
```

### 구현 패턴

```tsx
// src/app/projects/page.tsx (Server Component)
const projects = await getAllProjects();
return <ProjectFilter projects={projects} />;

// src/components/portfolio/ProjectFilter.tsx (Client Component)
// techStack 배열을 기준으로 필터 상태 관리
```

---

## 다음 단계

→ [06-admin.md](./06-admin.md)

---

## 현재 상황

- Home(`/`) 의 `#projects` 섹션에 전체 프로젝트가 표시됨
- `/projects` 독립 페이지 없음
- 검색 / 기술스택 필터 없음

---

## 구현할 내용

### 새로 생성할 파일

| 파일                                          | 내용                                |
| --------------------------------------------- | ----------------------------------- |
| `src/app/projects/page.tsx`                   | 프로젝트 목록 페이지                |
| `src/components/portfolio/ProjectsFilter.tsx` | 기술스택 필터 UI (Client Component) |

### 페이지 요구사항

```
/projects
├── 페이지 헤더 ("프로젝트")
├── 기술스택 필터 버튼 (All / React / Next.js / TypeScript / ...)
├── featured 프로젝트 상단 강조 표시
├── 프로젝트 카드 그리드 (반응형)
└── 빈 상태 (empty state)
```

### `src/config/site.ts` 수정 필요

```ts
// 현재
nav: [{ label: "프로젝트", href: "/#projects" }];

// 수정 후
nav: [{ label: "프로젝트", href: "/projects" }];
```

### ProjectCard 재사용

기존 `src/components/portfolio/ProjectCard.tsx` 그대로 사용 가능.  
필터 상태는 Client Component에서 관리, 목록 데이터는 서버에서 fetch 후 prop으로 전달.

### 구현 패턴

```tsx
// src/app/projects/page.tsx (Server Component)
const projects = await getAllProjects();
return <ProjectsClient projects={projects} />;

// src/components/portfolio/ProjectsClient.tsx (Client Component)
// 검색/필터 상태 관리
```

---

## 다음 단계

→ [06-admin.md](./06-admin.md)

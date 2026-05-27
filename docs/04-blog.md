# 4단계 — Blog 목록 · 상세

**상태: ✅ 완료 (기본 기능) / 🔶 일부 미완료**

---

## 완료된 작업

| 파일                               | 내용                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `src/app/blog/page.tsx`            | 블로그 목록 (서버 컴포넌트, `getPublishedPosts()` 호출)                |
| `src/app/blog/[slug]/page.tsx`     | 포스트 상세 (`generateStaticParams`, `generateMetadata`, `notFound()`) |
| `src/components/blog/PostCard.tsx` | 카드 — 썸네일, 날짜, 제목, 요약, 태그                                  |

### URL 구조

```
/blog          → 공개 포스트 목록
/blog/[slug]   → 포스트 상세
```

정적 내보내기(`output: "export"`)에서도 동작하도록 `generateStaticParams` 구현됨.

### 날짜 포맷

```ts
import { format } from "date-fns";
import { ko } from "date-fns/locale";
format(new Date(post.createdAt), "PPP", { locale: ko }); // "2025년 1월 15일"
```

---

## 미완료 항목

| 항목                  | 우선순위 | 설명                                                                                  |
| --------------------- | -------- | ------------------------------------------------------------------------------------- |
| 검색 UI               | 🟡 중간  | 블로그 목록에 검색 입력창 없음                                                        |
| 카테고리 / 태그 필터  | 🟡 중간  | 현재 태그 표시만 되고 클릭 필터 없음                                                  |
| loading / error state | 🟡 중간  | 서버 컴포넌트라 loading state 없음. Suspense 추가 필요                                |
| Markdown 렌더링       | 🔴 높음  | 본문이 `whitespace-pre-wrap`으로 표시됨. `react-markdown` + `rehype-highlight` 미설치 |
| 이전 글 / 다음 글     | 🟢 낮음  | 포스트 상세에 네비게이션 없음                                                         |
| 카테고리 타입         | 🟡 중간  | `Post` 타입에 `category` 필드 없음. 필요하면 추가                                     |

### Markdown 렌더링 추가 방법 (다음 단계 선택 시)

```bash
npm install react-markdown rehype-highlight remark-gfm
```

```tsx
// src/app/blog/[slug]/page.tsx
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
  {post.content}
</ReactMarkdown>;
```

---

## 다음 단계

→ [05-projects-page.md](./05-projects-page.md)

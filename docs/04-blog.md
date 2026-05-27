# 4단계 — Blog 목록 · 상세

**상태: ✅ 완료**

---

## 완료된 작업

| 파일                                 | 내용                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| `src/app/blog/page.tsx`              | 블로그 목록 (서버 컴포넌트, `getPublishedPosts()` 호출 후 BlogFilter에 전달)         |
| `src/components/blog/BlogFilter.tsx` | 검색 입력 + 태그 클릭 필터 (Client Component)                                        |
| `src/app/blog/[slug]/page.tsx`       | 포스트 상세 (`generateStaticParams`, `generateMetadata`, `notFound()`, 이전/다음 글) |
| `src/components/blog/PostCard.tsx`   | 카드 — 썸네일, 날짜, 제목, 요약, 태그                                                |

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

| 항목                  | 우선순위 | 설명                                                   |
| --------------------- | -------- | ------------------------------------------------------ |
| loading / error state | 🟡 중간  | 서버 컴포넌트라 loading state 없음. Suspense 추가 필요 |

---

## 다음 단계

→ [05-projects-page.md](./05-projects-page.md)

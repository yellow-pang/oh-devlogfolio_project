# 2단계 — 공통 레이아웃

**상태: ✅ 완료**

---

## 완료된 작업

| 파일                                         | 내용                                                  |
| -------------------------------------------- | ----------------------------------------------------- |
| `src/components/providers/ThemeProvider.tsx` | `next-themes` 래퍼, `"use client"`                    |
| `src/components/common/ThemeToggle.tsx`      | Sun/Moon 토글 버튼, `mounted` 상태로 hydration 방지   |
| `src/components/common/TagBadge.tsx`         | 재사용 태그 배지 (shadcn `Badge` variant="secondary") |
| `src/components/common/PageHeader.tsx`       | 페이지 공통 헤더 (제목 + 설명)                        |
| `src/components/layout/Header.tsx`           | 스티키 헤더, 모바일 햄버거, 활성 링크 표시            |
| `src/components/layout/Footer.tsx`           | 저작권 + 소셜 링크                                    |
| `src/app/layout.tsx`                         | 루트 레이아웃 — ThemeProvider, Header, main, Footer   |

### 루트 레이아웃 구조

```tsx
<html lang="ko" suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" defaultTheme="light">
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  </body>
</html>
```

### 네비게이션 링크

```ts
// src/config/site.ts
nav: [
  { label: "홈", href: "/" },
  { label: "프로젝트", href: "/#projects" },
  { label: "블로그", href: "/blog" },
];
```

> ⚠️ **미완료**: `/projects` 전용 페이지가 없어서 네비게이션의 "프로젝트" 링크가 `/#projects` 앵커로 처리됨.  
> 5단계에서 `/projects` 페이지를 추가하면 `nav` 배열도 수정 필요.

### 아이콘 주의사항

lucide-react에 `Github`, `Linkedin` 아이콘이 없음 → 아래로 대체함:

| 원본       | 대체      |
| ---------- | --------- |
| `Github`   | `GitFork` |
| `Linkedin` | `Link2`   |

### `asChild` 미지원 문제

shadcn/ui v4가 `@base-ui/react/button` 기반이라 `asChild` prop 미지원.  
해결: `buttonVariants()` 클래스를 `<Link>`에 직접 적용.

```tsx
// ❌ 동작 안 함
<Button asChild><Link href="...">텍스트</Link></Button>

// ✅ 올바른 방법
<Link href="..." className={buttonVariants({ variant: "outline", size: "sm" })}>
  텍스트
</Link>
```

---

## 다음 단계

→ [03-home.md](./03-home.md)

# 3단계 — Home 페이지

| **상태: ✅ 완료**                             |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/app/page.tsx`                            | Home 서버 컴포넌트 — `getAllProjects()` + `getPublishedPosts()` 호출 후 섹션 조합 |
| `src/components/portfolio/HeroSection.tsx`    | Hero + CTA 버튼 + 소셜 링크 + 바운싱 ArrowDown                                    |
| `src/components/portfolio/ProjectList.tsx`    | 프로젝트 섹션 헤더 + 3열 그리드 (`id="projects"` 앵커)                            |
| `src/components/portfolio/ProjectCard.tsx`    | 프로젝트 카드 (썸네일, 태그, techStack, GitHub/Demo 버튼)                         |
| `src/components/portfolio/SkillSection.tsx`   | 기술 스택 카테고리별 표시 (하드코딩)                                              |
| `src/components/portfolio/ContactSection.tsx` | 이메일 · GitHub · LinkedIn 연락 섹션                                              |
| `src/components/blog/RecentPostsSection.tsx`  | 홈에 노출되는 최근 블로그 글 3개 카드 그리드                                      |

### 페이지 구조

```tsx
// src/app/page.tsx (Server Component)
const [projects, allPosts] = await Promise.all([getAllProjects(), getPublishedPosts()]);
const recentPosts = allPosts.slice(0, 3);

<HeroSection />
<Separator />
<ProjectList projects={projects} />   {/* id="projects" */}
<Separator />
<SkillSection />
<Separator />
<RecentPostsSection posts={recentPosts} />
<Separator />
<ContactSection />
```

### 애니메이션

- `framer-motion` `whileInView` — 카드 등장 애니메이션
- HeroSection: `initial={{ opacity:0, y:30 }}` → staggered delay

### 미완료 항목

| 항목 | 설명 |
| ---- | ---- |

| SkillSection 동적화 | 현재 하드코딩. Firestore 연결 후에도 필요하면 별도 컬렉션으로 관리 가능 |

---

## 다음 단계

→ [04-blog.md](./04-blog.md)

# 6단계 — Admin Dashboard

**상태: 🔶 부분 완료**

---

## 완료된 작업

| 파일                                    | 상태 | 내용                                    |
| --------------------------------------- | ---- | --------------------------------------- |
| `src/components/admin/adminNav.ts`      | ✅   | 관리자 네비게이션 설정                  |
| `src/components/admin/AdminSidebar.tsx` | ✅   | 사이드바 (활성 링크, 사이트로 돌아가기) |
| `src/app/admin/layout.tsx`              | ✅   | 관리자 레이아웃 (Sidebar + content)     |
| `src/app/admin/page.tsx`                | ✅   | 대시보드 통계 카드 + 빠른 링크          |
| `src/app/admin/projects/page.tsx`       | ✅   | 프로젝트 CRUD 목록 + 인라인 폼          |
| `src/components/admin/ProjectForm.tsx`  | ✅   | `react-hook-form` 기반 프로젝트 폼      |
| `src/app/admin/posts/page.tsx`          | ✅   | 포스트 CRUD 목록 + 공개/비공개 토글     |
| `src/components/admin/PostForm.tsx`     | ✅   | `react-hook-form` 기반 포스트 폼        |

---

## 미완료 항목

| 항목                       | 우선순위 | 설명                                                                           |
| -------------------------- | -------- | ------------------------------------------------------------------------------ |
| 삭제 Confirm Dialog        | 🔴 높음  | 현재 `confirm()` 브라우저 기본 대화상자 사용. shadcn `AlertDialog`로 교체 필요 |
| 검색 필터 (Admin Posts)    | 🟡 중간  | 글 목록에 검색 입력창 없음                                                     |
| 검색 필터 (Admin Projects) | 🟡 중간  | 프로젝트 목록에 검색 없음                                                      |
| Table 컴포넌트             | 🟡 중간  | 현재 Card 목록 형태. shadcn `Table` 컴포넌트로 교체하면 더 깔끔함              |
| Admin 인증                 | 🟡 중간  | 현재 `/admin`에 인증 없음. Firebase Auth 또는 단순 패스워드 보호 필요          |
| 최근 글/프로젝트 목록      | 🟢 낮음  | 대시보드에 최근 수정일 summary 없음                                            |
| 이미지 미리보기            | 🟢 낮음  | `thumbnailUrl` 입력 후 미리보기 없음                                           |

### 삭제 Confirm Dialog 교체 방법

```bash
npx shadcn@latest add alert-dialog
```

```tsx
// 현재 (브라우저 기본)
if (confirm("정말 삭제하시겠습니까?")) await removeProject(id);

// 권장 (shadcn AlertDialog)
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" size="icon">
      <Trash2 />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>프로젝트를 삭제하시겠습니까?</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction onClick={() => removeProject(id)}>
        삭제
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

> ⚠️ `AlertDialogAction`도 `@base-ui/react/button` 기반이라 `asChild` 미지원 가능.  
> 확인 후 필요하면 `buttonVariants()`로 스타일 적용.

---

## 다음 단계

→ [07-firestore.md](./07-firestore.md)

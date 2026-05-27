# ohdevlogfolio — 전체 구현 개요

> 최종 업데이트: 2026-05-27

## 프로젝트 목표

Firebase Hosting + Cloud Firestore 기반의 개발자 포트폴리오 겸 학습 블로그

| 항목         | 내용                             |
| ------------ | -------------------------------- |
| 프로젝트명   | ohdevlogfolio                    |
| 배포 환경    | Firebase Hosting (정적 내보내기) |
| 데이터베이스 | Cloud Firestore (client SDK)     |
| 프레임워크   | Next.js App Router + TypeScript  |

## 핵심 제약 (변경 불가)

- Firebase Storage **사용 안 함** — 이미지는 `thumbnailUrl` 문자열만 처리
- Cloud Functions **사용 안 함**
- Next.js API Routes / Server Actions **사용 안 함**
- Firestore **client SDK만** 사용

---

## 구현 단계 전체 목록

| #   | 단계                                             | 상태         | 문서                                         |
| --- | ------------------------------------------------ | ------------ | -------------------------------------------- |
| 1   | 프로젝트 구조 · 패키지 설치 · 타입 정의          | ✅ 완료      | [01-setup.md](./01-setup.md)                 |
| 2   | 공통 레이아웃 (Header / Footer / ThemeToggle)    | ✅ 완료      | [02-layout.md](./02-layout.md)               |
| 3   | Home 페이지 (Hero / Projects / Skills / Contact) | ✅ 완료      | [03-home.md](./03-home.md)                   |
| 4   | Blog 목록 · 상세 페이지                          | ✅ 완료      | [04-blog.md](./04-blog.md)                   |
| 5   | Projects 전용 페이지 (`/projects`)               | ❌ 미구현    | [05-projects-page.md](./05-projects-page.md) |
| 6   | Admin Dashboard CRUD 완성                        | 🔶 부분 완료 | [06-admin.md](./06-admin.md)                 |
| 7   | Firestore 연결 (mock → 실제 DB)                  | ❌ 미구현    | [07-firestore.md](./07-firestore.md)         |
| 8   | Firebase Hosting 배포 설정                       | 🔶 부분 완료 | [08-hosting.md](./08-hosting.md)             |

**범례:** ✅ 완료 · 🔶 부분 완료 · ❌ 미구현

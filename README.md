# ohdevlogfolio

> 개발자 포트폴리오 겸 학습 블로그 | Firebase Hosting + Cloud Firestore + Next.js App Router

## 1. 프로젝트 소개

취업 준비 및 학습 과정에서 진행한 프로젝트와 공부 내용을 한 곳에서 관리하고 공유하기 위한 개발자 포트폴리오 겸 학습 블로그입니다.

관리자 대시보드에서 포스트와 프로젝트를 직접 CRUD하며, Firebase Hosting에 정적 배포합니다.

> **개발자 정보 (직접 수정)**
>
> - 이름: `[개발자명]`
> - GitHub: `[GitHub URL]`
> - 이메일: `[이메일 주소]`
> - 배포 URL: `[xxx.web.app]`

## 2. 현재 상태

| 영역                                             | 상태                         |
| ------------------------------------------------ | ---------------------------- |
| 공통 레이아웃 (Header / Footer / ThemeToggle)    | ✅ 완료                      |
| Home 페이지 (Hero / Skills / Projects / Contact) | ✅ 완료                      |
| Blog 목록 · 상세 페이지                          | ✅ 완료                      |
| Admin CRUD 대시보드                              | 🔶 부분 완료                 |
| `/projects` 전용 페이지                          | ❌ 미구현                    |
| Firestore 연결                                   | ❌ 미구현 (현재 mock 데이터) |
| Firebase Hosting 배포                            | ❌ 미완료                    |

## 3. 기술 스택

| 분류         | 기술                                  |
| ------------ | ------------------------------------- |
| 프레임워크   | Next.js App Router (정적 내보내기)    |
| 언어         | TypeScript                            |
| 스타일링     | Tailwind CSS + shadcn/ui              |
| 애니메이션   | framer-motion                         |
| 테마         | next-themes                           |
| Markdown     | react-markdown + rehype-highlight     |
| 데이터베이스 | Firebase Cloud Firestore (client SDK) |
| 배포         | Firebase Hosting                      |

## 4. 핵심 제약

- Firebase Storage **사용 안 함** — 이미지는 `thumbnailUrl` 문자열로 처리
- Cloud Functions / API Routes / Server Actions **사용 안 함**
- Firestore **client SDK만** 사용
- `output: "export"` — 완전 정적 배포

## 5. 로컬 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.local.example .env.local
# .env.local에 Firebase 설정값 입력

# 개발 서버 실행
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 6. 빌드 및 배포

```bash
# 빌드 (out/ 디렉토리 생성)
npm run build

# Firebase Hosting 배포
firebase deploy --only hosting
```

## 7. Repository 구조

```text
oh-devlogfolio_project/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # UI 컴포넌트
│   ├── config/           # 사이트 설정
│   ├── hooks/            # Custom Hooks
│   ├── lib/
│   │   ├── firebase/     # Firebase 초기화
│   │   ├── mock/         # Mock 데이터
│   │   └── services/     # 데이터 서비스 레이어
│   └── types/            # TypeScript 타입 정의
├── docs/
│   ├── planning/         # 기획·요구사항·로드맵
│   ├── design/           # 유저 플로우·화면 설계·데이터 모델
│   ├── architecture/     # 기술 스택 및 아키텍처
│   ├── deploy/           # 배포 가이드
│   └── 00-overview.md ~ 08-hosting.md  # 구현 단계별 가이드
├── public/
├── next.config.ts
└── package.json
```

## 8. 문서

| 문서                         | 경로                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| 전체 구현 개요               | [docs/00-overview.md](./docs/00-overview.md)                                                        |
| 프로젝트 기획서              | [docs/planning/01*프로젝트*기획서.md](./docs/planning/01_프로젝트_기획서.md)                        |
| 요구사항 정의서              | [docs/planning/02*요구사항*정의서.md](./docs/planning/02_요구사항_정의서.md)                        |
| 개발 로드맵                  | [docs/planning/03*개발*로드맵.md](./docs/planning/03_개발_로드맵.md)                                |
| 유저 플로우                  | [docs/design/01*유저*플로우.md](./docs/design/01_유저_플로우.md)                                    |
| 화면 설계서                  | [docs/design/02*화면*설계서.md](./docs/design/02_화면_설계서.md)                                    |
| 데이터 모델                  | [docs/design/03*데이터*모델.md](./docs/design/03_데이터_모델.md)                                    |
| 기술 스택 및 아키텍처        | [docs/architecture/01*기술*스택*및*아키텍처.md](./docs/architecture/01_기술_스택_및_아키텍처.md)    |
| Firebase Hosting 배포 가이드 | [docs/deploy/01*Firebase_Hosting*배포\_가이드.md](./docs/deploy/01_Firebase_Hosting_배포_가이드.md) |

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

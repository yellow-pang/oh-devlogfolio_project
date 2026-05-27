# Firebase Hosting 배포 가이드

| 문서 정보 | 내용                                       |
| --------- | ------------------------------------------ |
| 문서명    | ohdevlogfolio Firebase Hosting 배포 가이드 |
| 문서 버전 | v0.1                                       |
| 기준일    | 2026-05-27                                 |
| 배포 대상 | Firebase Hosting (정적 배포)               |

---

## 1. 배포 개요

ohdevlogfolio는 Next.js `output: "export"` 설정으로 **완전한 정적 파일(`out/` 디렉토리)** 을 생성하고,  
Firebase Hosting에 배포합니다.

```
로컬 개발 → npm run build → out/ 생성 → firebase deploy → xxx.web.app
```

---

## 2. 사전 조건

| 항목                   | 확인                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| Node.js 설치           | `node --version`                                                   |
| Firebase CLI 설치      | `npm install -g firebase-tools`                                    |
| Firebase 로그인        | `firebase login`                                                   |
| Firebase 프로젝트 생성 | [Firebase Console](https://console.firebase.google.com/) 에서 생성 |
| Firestore 활성화       | Firebase Console → Firestore Database → 생성                       |

---

## 3. 프로젝트 설정

### 3.1 `next.config.ts` (현재 설정 완료)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 내보내기 활성화
  images: {
    unoptimized: true, // Next.js Image 최적화 비활성 (정적 배포 호환)
  },
};

export default nextConfig;
```

### 3.2 `.env.local` 생성

프로젝트 루트에 `.env.local` 파일을 생성합니다.  
Firebase Console → 프로젝트 설정 → 앱 추가(웹) → SDK 설정에서 값을 복사합니다.

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **주의:** `.env.local`은 `.gitignore`에 포함되어 있습니다. GitHub에 커밋하지 마세요.

### 3.3 `.env.local.example` (참고용 — 직접 생성 필요)

```bash
# Firebase 환경변수 예시 (실제 값은 Firebase Console에서 확인)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 4. Firebase 초기화

### 4.1 프로젝트에서 Firebase 초기화

```bash
cd C:\Dev\oh-devlogfolio_project
firebase init
```

초기화 시 선택:

```
? Which Firebase features do you want to set up?
  ✅ Hosting: Configure files for Firebase Hosting

? Please select an option: Use an existing project
? Select a default Firebase project: [생성한 프로젝트 선택]

? What do you want to use as your public directory? out
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
```

> **중요:** `public directory`는 반드시 `out`으로 설정합니다. (Next.js 정적 내보내기 결과 경로)

### 4.2 생성되는 파일

**`firebase.json`:**

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

**`.firebaserc`:**

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

---

## 5. 빌드 및 배포 절차

### 5.1 최초 배포

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 확인
# .env.local 파일에 Firebase 설정값 입력 확인

# 3. 빌드
npm run build
# → out/ 디렉토리 생성 확인

# 4. 로컬 미리보기 (선택)
npx serve out

# 5. Firebase 배포
firebase deploy --only hosting

# 배포 완료 후 출력:
# Hosting URL: https://your-project-id.web.app
```

### 5.2 업데이트 배포 (반복 배포)

```bash
npm run build ; firebase deploy --only hosting
```

---

## 6. Firestore 보안 규칙 배포

Firestore 규칙 파일은 `firestore.rules`로 관리합니다.

```bash
# firestore.rules 파일 생성 후
firebase deploy --only firestore:rules
```

---

## 7. 배포 URL

| 유형                 | URL                                             |
| -------------------- | ----------------------------------------------- |
| Firebase 기본 도메인 | `https://[project-id].web.app`                  |
| Firebase 보조 도메인 | `https://[project-id].firebaseapp.com`          |
| 커스텀 도메인 (선택) | Firebase Console → Hosting → 커스텀 도메인 추가 |

---

## 8. 배포 체크리스트

배포 전 아래 항목을 확인합니다.

```
[ ] .env.local에 Firebase 환경변수 모두 입력됨
[ ] npm run build 성공 (오류 없음)
[ ] out/ 디렉토리 생성 확인
[ ] firebase.json의 public 경로가 "out"으로 설정됨
[ ] .firebaserc에 올바른 프로젝트 ID 설정됨
[ ] Firebase Console에서 Hosting 활성화 확인
[ ] Firebase Console에서 Firestore Database 생성 확인
[ ] Firestore 보안 규칙 배포 완료
```

---

## 9. 정적 배포 제약 사항

| 제약                       | 설명                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| 서버 사이드 코드 실행 불가 | API Routes, Server Actions 사용 불가                              |
| 동적 라우팅 주의           | `[slug]` 경로는 `generateStaticParams`로 빌드 시 미리 생성        |
| 이미지 최적화 비활성       | `next/image` 컴포넌트는 `unoptimized: true` 설정 필요             |
| 환경변수 노출              | `NEXT_PUBLIC_` 접두사 변수는 브라우저에 노출. 민감 정보 포함 금지 |

---

## 10. 문제 해결

### `out/` 디렉토리가 생성되지 않을 때

```bash
# next.config.ts에 output: "export" 설정 확인
cat next.config.ts
```

### 빌드 오류: `generateStaticParams` 없는 동적 라우팅

```
Error: Page "/blog/[slug]" is missing "generateStaticParams()"
```

→ `src/app/blog/[slug]/page.tsx`에 `generateStaticParams` 함수가 있는지 확인합니다.

### Firebase 배포 후 페이지 404

→ `firebase.json`의 `public` 경로가 `out`으로 설정되어 있는지 확인합니다.  
→ SPA rewrite가 필요한 경우 `rewrites` 설정 추가를 검토합니다.

# 8단계 — Firebase Hosting 배포 설정

**상태: 🔶 부분 완료**

---

## 완료된 항목

| 항목                          | 상태 | 파일                           |
| ----------------------------- | ---- | ------------------------------ |
| `output: "export"` 설정       | ✅   | `next.config.ts`               |
| `images.unoptimized: true`    | ✅   | `next.config.ts`               |
| `generateStaticParams` (blog) | ✅   | `src/app/blog/[slug]/page.tsx` |
| `.env.local.example`          | ✅   | 루트                           |

---

## 미완료 항목

| 항목                      | 설명                            |
| ------------------------- | ------------------------------- |
| `firebase.json`           | Firebase Hosting 설정 파일 없음 |
| `.firebaserc`             | 프로젝트 연결 파일 없음         |
| Firebase CLI 초기화       | `firebase init hosting` 미실행  |
| `npm run build` 최종 검증 | 빌드 성공 여부 미확인           |

---

## 추가 작업 순서

### 1. Firebase CLI 설치 및 로그인

```bash
npm install -g firebase-tools
firebase login
```

### 2. Firebase 프로젝트 초기화

```bash
firebase init hosting
# ? What do you want to use as your public directory? out
# ? Configure as a single-page app? No
# ? Set up automatic builds with GitHub Actions? No
```

### 3. `firebase.json` 예시

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [{ "key": "Cache-Control", "value": "max-age=31536000" }]
      }
    ]
  }
}
```

### 4. `.firebaserc` 예시

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 5. 배포 명령어

```bash
# 1. 빌드
npm run build
# → out/ 폴더 생성

# 2. 배포
firebase deploy --only hosting
```

---

## 빌드 전 체크리스트

- [ ] `.env.local` 작성 완료
- [ ] `npm run build` 오류 없음
- [ ] 모든 동적 라우트에 `generateStaticParams` 있음
- [ ] `use client` 컴포넌트에서 `window`/`document` 접근 시 `mounted` 체크
- [ ] `firebase.json` 의 `public` 경로가 `out` 인지 확인 (Next.js `output: "export"` 기본값)

---

## 전체 완료 후 배포 흐름

```text
코드 수정
  └→ npm run build
       └→ out/ 생성
            └→ firebase deploy --only hosting
                  └→ Firebase Hosting 업데이트
```

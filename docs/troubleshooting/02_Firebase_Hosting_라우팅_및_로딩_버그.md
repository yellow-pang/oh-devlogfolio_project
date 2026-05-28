# Firebase Hosting 라우팅 오류 및 홈 화면 로딩 버그

> 작성일: 2026-05-28

---

## 1. 문제 발생

### 증상 1 — `/admin/login` 접속 불가

`https://oh-devlogfolio.web.app/admin/login` 직접 접속 시  
로그인 페이지가 표시되지 않고 홈 화면(`/`)으로 리다이렉트됨.  
로컬 개발 환경(`npm run dev`)에서는 정상 접속되어 배포 환경 고유 문제임을 확인.

### 증상 2 — 관리자 페이지 RSC 404 오류

`/admin/login` 접속 후 관리자 화면으로 진입하자 브라우저 콘솔에 다수의 404 오류 발생:

```
GET /admin/posts/__next.admin.posts.__PAGE__.txt  404 (Not Found)
GET /admin/projects/__next.admin.projects.txt     404 (Not Found)
GET /admin/categories/__next.admin.categories.txt 404 (Not Found)
```

화면은 표시되나 Next.js RSC(React Server Component) 페이로드 파일을 찾지 못하는 상태.

### 증상 3 — 홈 화면 "등록된 프로젝트가 없습니다." 순간 표시

홈 화면(`/`) 접속 시 프로젝트 섹션에 "등록된 프로젝트가 없습니다." 텍스트가  
Firestore 데이터 로드 전에 순간적으로 표시되다가 실제 데이터로 교체됨.

---

## 2. 원인 파악

### 원인 A — `firebase.json` catch-all rewrite 규칙 충돌

`firebase.json`에 설정된 `"**" → /index.html` catch-all rewrite가  
Firebase Hosting의 정적 파일 매칭보다 **먼저 적용**되어,  
`out/admin/login.html`이 존재함에도 홈으로 리다이렉트됨.

Firebase Hosting의 요청 처리 우선순위:

```
1. 정확한 파일 매칭 (out/admin/login.html)
2. cleanUrls 매칭
3. rewrites 규칙
```

이론상 파일이 존재하면 rewrite보다 파일이 우선이어야 하나,  
`"**"` 패턴이 모든 경로를 가로채어 파일 서빙을 방해하는 것으로 확인됨.

```json
// 문제 코드
"rewrites": [
  { "source": "/blog/**", "destination": "/blog.html" },
  { "source": "**",       "destination": "/index.html" }  ← 이 규칙이 모든 경로 가로챔
]
```

### 원인 B — `cleanUrls: true`로 인한 RSC 파일 경로 평탄화

증상 1 해결을 위해 catch-all rewrite 제거 후 `cleanUrls: true`를 추가했으나,  
`cleanUrls`가 Next.js RSC 페이로드 파일의 경로를 의도치 않게 평탄화함.

실제 파일 구조:

```
out/admin/posts/__next.admin/posts/__PAGE__.txt
```

Firebase가 변환한 요청 경로:

```
/admin/posts/__next.admin.posts.__PAGE__.txt  ← 404
```

디렉터리 구분자(`/`)를 `.`으로 합쳐 경로가 달라지면서 파일을 찾지 못함.

### 원인 C — `app/page.tsx` loading 상태 누락

홈 화면이 Client Component로 전환된 이후, Firestore fetch가 완료되기 전  
빈 배열(`[]`)이 `ProjectList`에 전달됨.

`ProjectList` 컴포넌트는 빈 배열을 받으면 "등록된 프로젝트가 없습니다."를 렌더링하므로,  
fetch 완료까지 잠깐 해당 텍스트가 노출되는 깜빡임 발생.

```tsx
// 문제 코드 — loading 상태 없이 초기 빈 배열 그대로 전달
<ProjectList projects={projects} /> // projects = [] (로딩 중)
```

---

## 3. 해결 방법 후보

### 방법 1 — catch-all rewrite 유지 + 예외 경로 추가

`/admin/**` 등 예외 경로를 rewrite 앞에 명시적으로 추가.

- **장점**: 새 포스트 등 빌드 후 추가된 URL도 catch-all로 처리 가능
- **단점**: 관리가 필요한 예외 경로가 늘어남, 경로 추가마다 수동 업데이트 필요

### 방법 2 — catch-all rewrite 제거 + cleanUrls 사용

`"**"` catch-all을 제거하고 `cleanUrls: true`로 정적 파일을 직접 서빙.

- **장점**: 정적 파일이 존재하는 경로는 항상 올바르게 서빙, 규칙 단순화
- **단점**: `cleanUrls`가 RSC 페이로드 파일 경로를 평탄화해 404 발생 (→ 증상 2)

### 방법 3 — catch-all rewrite 제거 (cleanUrls 미사용) (선택)

`"**"` catch-all만 제거하고 `cleanUrls`는 추가하지 않음.  
Firebase Hosting은 `cleanUrls` 없이도 `.html` 파일을 확장자 없는 URL로 기본 서빙함.

- **장점**: RSC 경로 평탄화 문제 없음, 정적 파일 직접 서빙
- **단점**: 없음

---

## 4. 선택한 해결 방식 및 이유

**방법 3 — catch-all rewrite 제거 (cleanUrls 미사용)**를 선택.

| 판단 기준          | 이유                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| RSC 호환성         | `cleanUrls`가 Next.js RSC 페이로드 경로를 깨뜨림 → 방법 2 제외        |
| Firebase 기본 동작 | `.html` 파일 존재 시 확장자 없는 URL로 자동 서빙 → `cleanUrls` 불필요 |
| 규칙 단순성        | catch-all 제거로 의도치 않은 라우팅 가로채기 원천 방지                |

---

## 5. 적용 내용

### 5-1. `firebase.json` — catch-all 제거 (cleanUrls 미사용)

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/blog/**",
        "destination": "/blog.html"
      }
    ]
  }
}
```

### 5-2. `next.config.ts` — trailingSlash 명시

```ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
};
```

### 5-3. `app/page.tsx` — loading 상태 추가

```tsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  Promise.all([
    getAllProjects().then(setProjects),
    getPublishedPosts().then((posts) => setRecentPosts(posts.slice(0, 3))),
  ]).finally(() => setLoading(false));
}, []);

// fetch 완료 전 ProjectList 렌더링 차단
{
  !loading && <ProjectList projects={projects} />;
}
```

---

### 5-4. `.gitignore` — `.firebase/` 추가

Firebase CLI 배포 시 생성되는 캐시 파일(`hosting.*.cache`)이 git에 추적되는 문제 수정.

```
# firebase
.firebase/
```

---

## 6. 결과

| 상황                     | 변경 전                       | 변경 후                 |
| ------------------------ | ----------------------------- | ----------------------- |
| `/admin/login` 직접 접속 | 홈 화면으로 리다이렉트        | 로그인 페이지 정상 표시 |
| `/admin/**` 모든 경로    | 홈으로 리다이렉트             | 각 페이지 정상 서빙     |
| 관리자 페이지 RSC 파일   | 404 오류                      | 정상 로드               |
| 홈 화면 프로젝트 섹션    | 로딩 전 "없습니다." 순간 표시 | 데이터 준비 후 렌더링   |
| `.firebase/` 캐시 파일   | git 추적됨                    | `.gitignore`로 제외     |

## 7. 참고 — 브라우저 캐시 주의

Firebase Hosting 설정 변경 후 재배포해도 브라우저 캐시로 인해  
이전 동작이 유지되는 것처럼 보일 수 있음.  
**시크릿 창**으로 먼저 확인 후, 일반 창은 강력 새로고침(`Ctrl+Shift+R`) 또는 캐시 삭제 후 테스트.

---

## 8. 재발 — 방법 3 오판으로 인한 전체 경로 404

> 발생일: 2026-05-28 (hotfix/admin-login-fix 브랜치)

### 증상

`firebase deploy --only hosting` 후 브라우저 콘솔:

```
GET https://oh-devlogfolio.web.app/admin/login  404 (Not Found)
HEAD https://oh-devlogfolio.web.app/projects    404 (Not Found)
HEAD https://oh-devlogfolio.web.app/blog        404 (Not Found)
```

`/admin/login`뿐 아니라 `/projects`, `/blog` 등 모든 경로 404.

### 원인 — 4절 방법 3의 전제가 틀렸음

4절에서 방법 3을 선택한 근거 중 하나가  
**"Firebase Hosting은 cleanUrls 없이도 .html 파일을 확장자 없는 URL로 기본 서빙한다"** 였으나,  
이는 사실이 아님.

Firebase Hosting의 실제 요청 처리 순서:

```
1. 정확한 파일 매칭  → /admin/login  (파일 없음, 실제 파일명은 admin/login.html)
2. 디렉토리 index    → /admin/login/index.html  (없음)
3. rewrites 매칭    → 해당 없음
4. 404 반환
```

`cleanUrls: true` 없이는 `.html` 확장자가 포함된 URL(예: `/admin/login.html`)로만 접근 가능.  
`trailingSlash: false` 빌드 출력은 `out/admin/login.html` (flat) 이므로  
`cleanUrls` 없이는 확장자 없는 URL에서 항상 404.

### 이전에 cleanUrls를 제거한 이유가 틀린 분석이었음

과거에 `cleanUrls: true` 제거 시 근거로 든 RSC 404:

```
GET /admin/posts/__next.admin.posts.__PAGE__.txt  404
```

이것은 `cleanUrls` 자체의 문제가 아니라,  
당시 `trailingSlash: true` 빌드 상태에서 RSC 파일이 **중첩 디렉토리** 구조로 생성되었기 때문:

```
out/admin/posts/__next.admin/posts/__PAGE__.txt  (중첩 디렉토리)
                ↕ cleanUrls가 경로 평탄화
/admin/posts/__next.admin.posts.__PAGE__.txt     (404)
```

`trailingSlash: false` 빌드에서 RSC 파일은 **flat `.txt` 파일**로 생성됨:

```
out/projects/__next.projects.txt   ← cleanUrls는 .html만 처리, .txt 무관
```

따라서 `trailingSlash: false` + `cleanUrls: true` 조합에서는 RSC 404가 발생하지 않음.

### 최종 수정

`firebase.json`에 `cleanUrls: true` 재추가:

```json
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/blog/**",
        "destination": "/blog.html"
      }
    ]
  }
}
```

### 최종 정리 — 올바른 설정 조합

| next.config.ts         | firebase.json     | 결과                                                                    |
| ---------------------- | ----------------- | ----------------------------------------------------------------------- |
| `trailingSlash: false` | cleanUrls 없음    | ❌ 모든 경로 404                                                        |
| `trailingSlash: false` | `cleanUrls: true` | ✅ 정상 서빙, RSC 무영향                                                |
| `trailingSlash: true`  | `cleanUrls: true` | ❌ RSC 중첩 디렉토리 404                                                |
| `trailingSlash: true`  | cleanUrls 없음    | ✅ 정상 서빙 (단, blog rewrite 목적지를 `/blog/index.html`로 변경 필요) |

**채택: `trailingSlash: false` + `cleanUrls: true`**

# Firebase Hosting 라우팅 오류 및 홈 화면 로딩 버그

> 작성일: 2026-05-28

---

## 1. 문제 발생

### 증상 1 — `/admin/login` 접속 불가

`https://oh-devlogfolio.web.app/admin/login` 직접 접속 시  
로그인 페이지가 표시되지 않고 홈 화면(`/`)으로 리다이렉트됨.  
로컬 개발 환경(`npm run dev`)에서는 정상 접속되어 배포 환경 고유 문제임을 확인.

### 증상 2 — 홈 화면 "등록된 프로젝트가 없습니다." 순간 표시

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

### 원인 B — `app/page.tsx` loading 상태 누락

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

### 방법 2 — catch-all rewrite 제거 + cleanUrls 사용 (선택)

`"**"` catch-all을 제거하고 `cleanUrls: true`로 정적 파일을 직접 서빙.  
빌드 후 추가된 블로그 포스트 URL은 `/blog/**` 한정 rewrite로 처리.

- **장점**: 정적 파일이 존재하는 경로는 항상 올바르게 서빙, 규칙 단순화
- **단점**: 블로그 외 경로에서 빌드 후 신규 추가 URL 미대응 (현재 프로젝트 구조상 해당 없음)

---

## 4. 선택한 해결 방식 및 이유

**방법 2 — catch-all rewrite 제거 + cleanUrls**를 선택.

| 판단 기준        | 이유                                                   |
| ---------------- | ------------------------------------------------------ |
| 현재 라우트 구조 | 동적으로 새 경로가 추가되는 경우는 `/blog/[slug]`뿐    |
| 규칙 단순성      | catch-all 제거로 의도치 않은 라우팅 가로채기 원천 방지 |
| 유지보수         | 새 경로 추가 시 예외 규칙을 관리할 필요 없음           |

---

## 5. 적용 내용

### 5-1. `firebase.json` — catch-all 제거 및 cleanUrls 추가

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
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

## 6. 결과

| 상황                     | 변경 전                       | 변경 후                 |
| ------------------------ | ----------------------------- | ----------------------- |
| `/admin/login` 직접 접속 | 홈 화면으로 리다이렉트        | 로그인 페이지 정상 표시 |
| `/admin/**` 모든 경로    | 홈으로 리다이렉트             | 각 페이지 정상 서빙     |
| 홈 화면 프로젝트 섹션    | 로딩 전 "없습니다." 순간 표시 | 데이터 준비 후 렌더링   |

## 7. 참고 — 브라우저 캐시 주의

Firebase Hosting 설정 변경 후 재배포해도 브라우저 캐시로 인해  
이전 동작이 유지되는 것처럼 보일 수 있음.  
**시크릿 창**으로 먼저 확인 후, 일반 창은 강력 새로고침(`Ctrl+Shift+R`) 또는 캐시 삭제 후 테스트.

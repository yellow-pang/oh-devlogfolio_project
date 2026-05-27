# 7단계 — Firestore 연결

**상태: ❌ 미구현 (준비는 완료됨)**

---

## 현재 상황

- `src/lib/firebase/config.ts` — Firebase 초기화 코드 있음, 환경변수만 채우면 됨
- `src/lib/services/projects.ts` — `// TODO: Firestore 교체 시` 주석으로 교체 위치 표시됨
- `src/lib/services/posts.ts` — 동일
- `.env.local.example` — 필요한 환경변수 목록 작성됨

---

## 구현 순서

### 1. `.env.local` 생성

```bash
cp .env.local.example .env.local
# 실제 Firebase 콘솔 값으로 채우기
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc
```

### 2. Firestore 보안 규칙 (Firebase 콘솔)

```
// 읽기: 누구나 / 쓰기: 인증된 사용자만 (최소 설정)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /posts/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

> ⚠️ Admin 인증 미구현 상태이므로 임시로 `allow write: if true;` 사용 가능하나 **배포 전 반드시 수정**.

### 3. `src/lib/services/projects.ts` 교체 포인트

```ts
// TODO 주석 위치에 아래 코드로 교체

import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

// Timestamp → string 변환 헬퍼
function toDate(ts: Timestamp | string): string {
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return ts;
}

export async function getAllProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: toDate(d.data().createdAt),
    updatedAt: toDate(d.data().updatedAt),
  })) as Project[];
}

export async function createProject(data: ProjectFormData): Promise<Project> {
  const ref = await addDoc(collection(db, "projects"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  return { id: snap.id, ...snap.data() } as Project;
}

export async function updateProject(
  id: string,
  data: Partial<ProjectFormData>,
) {
  await updateDoc(doc(db, "projects", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "projects", id));
}
```

### 4. `src/lib/services/posts.ts` 교체 포인트

posts 서비스도 동일한 패턴으로 교체.  
`published: true` 필터는 `where("published", "==", true)` 쿼리로 처리.

---

## 주의 사항

| 항목               | 설명                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| `output: "export"` | 정적 내보내기에서 서버 컴포넌트는 빌드 시 1회 실행됨 → 실시간 업데이트 없음    |
| Admin CRUD         | 클라이언트 훅(`useProjects`, `usePosts`)에서 직접 Firestore 호출 → 실시간 반영 |
| ISR 불가           | Firebase Hosting은 정적 파일만 지원. `revalidate` 사용 불가                    |
| 이미지             | `thumbnailUrl`은 외부 URL 또는 `/images/` 경로만 사용. Storage 미사용          |

---

## 다음 단계

→ [08-hosting.md](./08-hosting.md)

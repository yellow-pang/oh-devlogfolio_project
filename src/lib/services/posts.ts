import { Post, PostFormData } from "@/types/post";
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
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

// Firestore Timestamp → ISO string 변환
function toDateString(ts: Timestamp | string | undefined): string {
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return ts ?? new Date().toISOString();
}

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: toDateString(d.data().createdAt),
    updatedAt: toDateString(d.data().updatedAt),
  })) as Post[];
}

export async function getPublishedPosts(): Promise<Post[]> {
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: toDateString(d.data().createdAt),
    updatedAt: toDateString(d.data().updatedAt),
  })) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return {
    id: d.id,
    ...d.data(),
    createdAt: toDateString(d.data().createdAt),
    updatedAt: toDateString(d.data().updatedAt),
  } as Post;
}

export async function getPostById(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...snap.data(),
    createdAt: toDateString(snap.data().createdAt),
    updatedAt: toDateString(snap.data().updatedAt),
  } as Post;
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createPost(data: PostFormData): Promise<Post> {
  const ref = await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  return {
    id: snap.id,
    ...snap.data(),
    createdAt: toDateString(snap.data()?.createdAt),
    updatedAt: toDateString(snap.data()?.updatedAt),
  } as Post;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updatePost(
  id: string,
  data: Partial<PostFormData>,
): Promise<Post> {
  const ref = doc(db, "posts", id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error(`Post not found: ${id}`);
  return {
    id: snap.id,
    ...snap.data(),
    createdAt: toDateString(snap.data().createdAt),
    updatedAt: toDateString(snap.data().updatedAt),
  } as Post;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
}

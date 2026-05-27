import { Project, ProjectFormData } from "@/types/project";
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

// Firestore Timestamp → ISO string 변환
function toDateString(ts: Timestamp | string | undefined): string {
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return ts ?? new Date().toISOString();
}

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: toDateString(d.data().createdAt),
    updatedAt: toDateString(d.data().updatedAt),
  })) as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, "projects", id));
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...snap.data(),
    createdAt: toDateString(snap.data().createdAt),
    updatedAt: toDateString(snap.data().updatedAt),
  } as Project;
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createProject(data: ProjectFormData): Promise<Project> {
  const ref = await addDoc(collection(db, "projects"), {
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
  } as Project;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateProject(
  id: string,
  data: Partial<ProjectFormData>,
): Promise<Project> {
  const ref = doc(db, "projects", id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error(`Project not found: ${id}`);
  return {
    id: snap.id,
    ...snap.data(),
    createdAt: toDateString(snap.data().createdAt),
    updatedAt: toDateString(snap.data().updatedAt),
  } as Project;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

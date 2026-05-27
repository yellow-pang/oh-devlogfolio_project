export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PostFormData = Omit<Post, "id" | "createdAt" | "updatedAt">;

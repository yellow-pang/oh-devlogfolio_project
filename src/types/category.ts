export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export type CategoryFormData = Pick<Category, "name">;

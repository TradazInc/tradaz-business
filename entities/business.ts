export interface Business {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  logo?: string | null;
  metadata?: any;
  categoryId: string;
}

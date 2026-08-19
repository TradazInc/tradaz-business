import { ApiClient } from "@/lib/apiClient";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  gender: Gender;
  description: string;
  discountPercentage: number;
  category: { id: string; name: string }; // make optional
  sizeType: { id: string; sizes: { id: string; value: string }[] }; // make optional
  productStatus: ProductStatus;
  images: { id: string; url: string }[];
  variations: Variation[];
  vendor?: { user: { name: string } };
  _count?: { variations: number };
}

export interface Variation {
  id: string;
  sku: string;
  color: string;
  price: number;
  size: { id: string; value: string };
  teamVariations: TeamVariation[];
}

interface TeamVariation {
  id: string;
  team: { id: string; name: string; address: string };
  quantity: number;
}

export enum Gender {
  male = "male",
  female = "female",
  unisex = "unisex",
}

export enum ProductStatus {
  approved = "approved",
  pending = "pending",
  rejected = "rejected",
}

export const productService = new ApiClient<Product>("/api/products");

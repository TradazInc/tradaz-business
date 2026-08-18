import { ApiClient } from "@/lib/apiClient";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  gender: Gender;
  description: string;
  discountPercentage: number;
  category: { id: string; name: string }; //make optional
  sizeType: { id: string; sizes: { id: string; value: string }[] }; // make optional
  productStatus: ProductStatus;
  images: Image[];
  variations: Variation[];
  vendor?: { user: { name: string } };
  _count?: { variations: number };
}

interface Variation {
  id: string;
  sku: string;
  color: string;
  price: number;
  sizeId: string;
  teamVariations: TeamVariation[];
}

interface TeamVariation {
  id: string;
  teamId: string;
  quantity: number;
}

interface Image {
  id: string;
  url: string;
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

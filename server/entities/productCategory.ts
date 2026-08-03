import { ApiClient } from "@/lib/apiClient";

export interface ProductCategory {
  id: string;
  name: string;
}

export const productCategoryService = new ApiClient<ProductCategory>(
  "/api/product-categories",
);

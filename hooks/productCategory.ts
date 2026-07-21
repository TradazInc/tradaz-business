import { ProductCategory } from "@/entities/ProductCategory";
import { ApiClient } from "@/lib/apiClient";
import useSWR from "swr";

const productCategoryService = new ApiClient<ProductCategory>(
  "/api/product-categories",
);

export const useProductCategories = () => {
  return useSWR("product-categories", () => productCategoryService.getAll());
};
